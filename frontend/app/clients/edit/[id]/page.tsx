"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { updateClient, getClient } from "@/lib/clients";
import type { NewClient } from "@/lib/definitions";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  error?: string;
};

function Input({
  label,
  name,
  icon,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          {...props}
          className={`
            w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3
            ${icon ? "pl-11" : ""}
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none
            hover:border-gray-300
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : ""
            }
          `}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

const REGEX = {
  name: /^[a-zA-ZÀ-ÿ\s]{2,100}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  cpfCnpj: /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
};

const formatCPFCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 14);

  if (limited.length <= 11) {
    const cpfLimited = limited.slice(0, 11);
    if (cpfLimited.length === 0) return "";
    if (cpfLimited.length <= 3) return cpfLimited;
    if (cpfLimited.length <= 6) return `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3)}`;
    if (cpfLimited.length <= 9) return `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3, 6)}.${cpfLimited.slice(6)}`;
    return `${cpfLimited.slice(0, 3)}.${cpfLimited.slice(3, 6)}.${cpfLimited.slice(6, 9)}-${cpfLimited.slice(9)}`;
  }
  
  const cnpjLimited = limited.slice(0, 14);
  if (cnpjLimited.length <= 2) return cnpjLimited;
  if (cnpjLimited.length <= 5) return `${cnpjLimited.slice(0, 2)}.${cnpjLimited.slice(2)}`;
  if (cnpjLimited.length <= 8) return `${cnpjLimited.slice(0, 2)}.${cnpjLimited.slice(2, 5)}.${cnpjLimited.slice(5)}`;
  if (cnpjLimited.length <= 12) return `${cnpjLimited.slice(0, 2)}.${cnpjLimited.slice(2, 5)}.${cnpjLimited.slice(5, 8)}/${cnpjLimited.slice(8)}`;
  return `${cnpjLimited.slice(0, 2)}.${cnpjLimited.slice(2, 5)}.${cnpjLimited.slice(5, 8)}/${cnpjLimited.slice(8, 12)}-${cnpjLimited.slice(12)}`;
};

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 11);
  
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : "";
  }
  if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  }
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
};

const formatName = (value: string): string => {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
};

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id ? Number(params.id) : null;

  const [formData, setFormData] = useState<NewClient>({
    name: "",
    cpf_cnpj: "",
    email: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadClient() {
      if (!clientId) {
        setIsLoading(false);
        return;
      }

      try {
        const client = await getClient(clientId);
        setFormData({
          name: client.name || "",
          cpf_cnpj: client.cpf_cnpj ? formatCPFCNPJ(client.cpf_cnpj.replace(/\D/g, "")) : "",
          email: client.email || "",
          phone: client.phone ? formatPhone(client.phone.replace(/\D/g, "")) : "",
        });
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
        setSubmissionMessage({
          type: "error",
          text: "Erro ao carregar dados do cliente. Tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadClient();
  }, [clientId]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!REGEX.name.test(value.trim())) {
          return "Nome deve conter apenas letras e espaços (2-100 caracteres)";
        }
        break;
      case "email":
        if (!REGEX.email.test(value)) {
          return "Email inválido";
        }
        break;
      case "cpf_cnpj":
        if (!REGEX.cpfCnpj.test(value)) {
          return "CPF/CNPJ inválido. Use o formato: 000.000.000-00 ou 00.000.000/0001-00";
        }
        break;
      case "phone":
        if (!REGEX.phone.test(value)) {
          return "Celular inválido. Use o formato: (00) 90000-0000";
        }
        break;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case "cpf_cnpj":
        formattedValue = formatCPFCNPJ(value);
        break;
      case "phone":
        formattedValue = formatPhone(value);
        break;
      case "name":
        formattedValue = formatName(value);
        break;
      default:
        formattedValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    if (fieldErrors[name]) {
      const error = validateField(name, formattedValue);
      if (!error) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof NewClient]);
      if (error) {
        errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmissionMessage({
        type: "error",
        text: "Por favor, corrija os erros no formulário",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage(null);
    try {
      await updateClient(clientId, formData);
      setSubmissionMessage({
        type: "success",
        text: "Cliente atualizado com sucesso! Redirecionando...",
      });
      setTimeout(() => {
        router.push("/clients/list");
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      setSubmissionMessage({
        type: "error",
        text: errorMessage || "Erro ao atualizar cliente. Verifique os dados e tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-gray-600">Carregando dados do cliente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-gray-50 via-white to-indigo-50/30 min-h-screen">
      <div className="max-w-3xl mx-auto py-12">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Editar Cliente
          </h1>
          <p className="text-gray-600">
            Atualize as informações do cliente
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-100 rounded-xl">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Informações do Cliente
                </h2>
                <p className="text-sm text-gray-500">
                  Dados de identificação e contato
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <Input
                label="Nome Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite o nome completo"
                pattern="^[a-zA-ZÀ-ÿ\s]{2,100}$"
                icon={<User className="h-5 w-5" />}
                error={fieldErrors.name}
                className="md:col-span-6"
                required
              />

              <Input
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="email@exemplo.com"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                icon={<Mail className="h-5 w-5" />}
                error={fieldErrors.email}
                className="md:col-span-6"
                required
              />

              <Input
                label="CPF/CNPJ"
                name="cpf_cnpj"
                value={formData.cpf_cnpj}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
                pattern="^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$"
                icon={<CreditCard className="h-5 w-5" />}
                error={fieldErrors.cpf_cnpj}
                className="md:col-span-3"
                required
              />

              <Input
                label="Celular"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(00) 90000-0000"
                pattern="^\(\d{2}\)\s\d{4,5}-\d{4}$"
                icon={<Phone className="h-5 w-5" />}
                error={fieldErrors.phone}
                className="md:col-span-3"
                required
              />
            </div>
          </div>

          {submissionMessage && (
            <div
              className={`
                mt-6 p-4 rounded-xl flex items-center gap-3
                ${
                  submissionMessage.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }
              `}
            >
              {submissionMessage.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <p
                className={`text-sm font-medium ${
                  submissionMessage.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {submissionMessage.text}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Dica:</span> Todos os campos são
              obrigatórios.
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-indigo-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

