"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewSupplier } from "@/lib/definitions";
import { createSupplier } from "@/lib/suppliers";
import {
  ArrowLeft,
  Save,
  Building2,
  MapPin,
  Mail,
  Phone,
  Home,
  CreditCard,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none
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

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: React.ReactNode;
  error?: string;
};

function Select({
  label,
  name,
  children,
  error,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...props}
        className={`
          w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3
          text-gray-900
          transition-all duration-200
          focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none
          hover:border-gray-300
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : ""
          }
        `}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export default function CreateSupplierPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"company" | "address">("company");
  const [formData, setFormData] = useState<NewSupplier>({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    zip_code: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSupplier(formData);
      toast.success("Fornecedor criado com sucesso!");
      router.push("/suppliers");
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      toast.error(
        "Erro ao criar fornecedor. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-50 via-white to-green-50/30">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Título */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Novo Fornecedor
          </h1>
          <p className="text-gray-600">
            Preencha as informações do fornecedor para completar o cadastro
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Navegação por Abas */}
          <div className="mb-6">
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${
                    activeTab === "company"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                <Building2 className="h-4 w-4" />
                Dados da Empresa
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("address")}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${
                    activeTab === "address"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                <MapPin className="h-4 w-4" />
                Endereço
              </button>
            </div>
          </div>

          {/* Aba: Dados da Empresa */}
          {activeTab === "company" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-green-100 rounded-xl">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Informações da Empresa
                  </h2>
                  <p className="text-sm text-gray-500">
                    Dados básicos do fornecedor
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <Input
                  label="Razão Social"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo da empresa"
                  icon={<Building2 className="h-5 w-5" />}
                  className="md:col-span-6"
                  required
                />

                <Input
                  label="CNPJ"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  placeholder="00.000.000/0000-00"
                  icon={<CreditCard className="h-5 w-5" />}
                  className="md:col-span-3"
                  required
                />

                <Input
                  label="E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@empresa.com"
                  icon={<Mail className="h-5 w-5" />}
                  className="md:col-span-3"
                  required
                />

                <Input
                  label="Telefone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 0000-0000"
                  icon={<Phone className="h-5 w-5" />}
                  className="md:col-span-3"
                  required
                />
              </div>
            </div>
          )}

          {/* Aba: Endereço */}
          {activeTab === "address" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-green-100 rounded-xl">
                  <Home className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Endereço</h2>
                  <p className="text-sm text-gray-500">
                    Localização da empresa
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="zip_code"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    CEP
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="zip_code"
                      id="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                      placeholder="00000-000"
                      className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none hover:border-gray-300"
                    />
                  </div>
                </div>

                <Input
                  label="Logradouro"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, Avenida, etc."
                  icon={<Home className="h-5 w-5" />}
                  className="md:col-span-3"
                  required
                />

                <Input
                  label="Número"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Nº"
                  className="md:col-span-1"
                />

                <Input
                  label="Complemento"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  placeholder="Sala, Andar, etc."
                  className="md:col-span-3"
                />

                <Input
                  label="Bairro"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  placeholder="Nome do bairro"
                  className="md:col-span-3"
                />

                <Input
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Nome da cidade"
                  className="md:col-span-4"
                  required
                />

                <Select
                  label="Estado"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="md:col-span-2"
                  required
                >
                  <option value="">Selecione o estado</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Dica:</span> Todos os campos
              marcados são obrigatórios
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.push("/suppliers")}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100"
              >
                <Save className="h-5 w-5" />
                Salvar Fornecedor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
