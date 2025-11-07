"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NewEmployee } from "@/lib/definitions";
import { getEmployee, updateEmployee } from "@/lib/employees";
import {
    ArrowLeft,
    Save,
    User,
    Mail,
    Briefcase,
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
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none
            hover:border-gray-300
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error
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

export default function EditEmployeePage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<NewEmployee>({
        name: "",
        email: "",
        department: "",
    });

    useEffect(() => {
        async function loadEmployee() {
            try {
                const employee = await getEmployee(Number(params.id));
                setFormData({
                    name: employee.name,
                    email: employee.email,
                    department: employee.department,
                });
            } catch (error) {
                console.error("Erro ao carregar funcionário:", error);
                toast.error("Erro ao carregar funcionário.");
            } finally {
                setLoading(false);
            }
        }
        loadEmployee();
    }, [params.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEmployee(Number(params.id), formData);
            toast.success("Funcionário atualizado com sucesso!");
            setTimeout(() => router.push("/employees"), 1500);
        } catch (error) {
            console.error("Erro ao atualizar funcionário:", error);
            toast.error(
                "Erro ao atualizar funcionário. Verifique os dados e tente novamente."
            );
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-linear-to-br from-gray-50 via-white to-purple-50/30">
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
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </button>

                {/* Título */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Editar Funcionário
                    </h1>
                    <p className="text-gray-600">
                        Atualize as informações do funcionário
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Card de Informações */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-purple-100 rounded-xl">
                                <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Informações do Funcionário
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Dados básicos e de contato
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Nome Completo"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite o nome completo"
                                icon={<User className="h-5 w-5" />}
                                className="md:col-span-2"
                                required
                            />

                            <Input
                                label="E-mail"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@exemplo.com"
                                icon={<Mail className="h-5 w-5" />}
                                required
                            />

                            <Input
                                label="Departamento"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Ex: Vendas, TI, RH"
                                icon={<Briefcase className="h-5 w-5" />}
                                required
                            />
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                            <span className="font-medium">Dica:</span> Todos os campos
                            marcados são obrigatórios
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => router.push("/employees")}
                                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100"
                            >
                                <Save className="h-5 w-5" />
                                Atualizar Funcionário
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}