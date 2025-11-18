"use client";

import { useState, useEffect, use } from "react"; // Importe 'use'
import { useRouter } from "next/navigation";
import type { NewClient } from "@/lib/definitions";
import { getClient, updateClient } from "@/lib/clients";
import {
    ArrowLeft,
    Save,
    User,
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
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className={`w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 ${icon ? "pl-11" : ""} text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
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

function Select({ label, name, children, error, className = "", ...props }: SelectProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <select
                id={name}
                name={name}
                {...props}
                className={`w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
            >
                {children}
            </select>
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
}

const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

// ATENÇÃO: O tipo de params agora é uma Promise
export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
    // CORREÇÃO: Desembrulha os params usando React.use()
    const { id } = use(params);

    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"personal" | "address">("personal");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<NewClient>({
        name: "",
        cpf_cnpj: "",
        rg: "",
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

    useEffect(() => {
        async function loadClient() {
            if (!id) return;
            try {
                const client = await getClient(Number(id));
                setFormData({
                    name: client.name,
                    cpf_cnpj: client.cpf_cnpj,
                    rg: client.rg,
                    email: client.email,
                    phone: client.phone,
                    zip_code: client.zip_code || "",
                    address: client.address,
                    number: client.number || "",
                    complement: client.complement || "",
                    neighborhood: client.neighborhood || "",
                    city: client.city,
                    state: client.state,
                });
            } catch (error) {
                console.error("Erro ao carregar cliente:", error);
                toast.error("Erro ao carregar cliente.");
            } finally {
                setLoading(false);
            }
        }
        loadClient();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação simples antes de enviar
        if (!formData.name || !formData.cpf_cnpj || !formData.email || !formData.city || !formData.state) {
            toast.error("Preencha os campos obrigatórios.");
            return;
        }

        try {
            await updateClient(Number(id), formData);
            toast.success("Cliente atualizado com sucesso!");
            setTimeout(() => router.push("/clients/list"), 1500);
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            toast.error("Erro ao atualizar cliente. Verifique os dados.");
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="bg-linear-to-br from-gray-50 via-white to-indigo-50/30">
            <ToastContainer position="bottom-right" autoClose={5000} />
            <div className="max-w-5xl mx-auto">
                <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Cliente</h1>
                    <p className="text-gray-600">Atualize as informações do cliente</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="flex gap-2 p-1.5 bg-gray-100 rounded-xl w-fit">
                            <button type="button" onClick={() => setActiveTab("personal")} className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "personal" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                                <User className="h-4 w-4" /> Dados Pessoais
                            </button>
                            <button type="button" onClick={() => setActiveTab("address")} className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "address" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                                <MapPin className="h-4 w-4" /> Endereço
                            </button>
                        </div>
                    </div>

                    {activeTab === "personal" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} icon={<User className="h-5 w-5" />} className="md:col-span-6" required />
                                <Input label="CPF/CNPJ" name="cpf_cnpj" value={formData.cpf_cnpj} onChange={handleChange} icon={<CreditCard className="h-5 w-5" />} className="md:col-span-3" required />
                                <Input label="RG" name="rg" value={formData.rg} onChange={handleChange} icon={<CreditCard className="h-5 w-5" />} className="md:col-span-3" required />
                                <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} icon={<Mail className="h-5 w-5" />} className="md:col-span-6" required />
                                <Input label="Celular" name="phone" type="tel" value={formData.phone} onChange={handleChange} icon={<Phone className="h-5 w-5" />} className="md:col-span-3" required />
                            </div>
                        </div>
                    )}

                    {activeTab === "address" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">CEP</label>
                                    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900" />
                                </div>
                                <Input label="Logradouro" name="address" value={formData.address} onChange={handleChange} icon={<Home className="h-5 w-5" />} className="md:col-span-3" required />
                                <Input label="Número" name="number" value={formData.number} onChange={handleChange} className="md:col-span-1" />
                                <Input label="Complemento" name="complement" value={formData.complement} onChange={handleChange} className="md:col-span-3" />
                                <Input label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="md:col-span-3" />
                                <Input label="Cidade" name="city" value={formData.city} onChange={handleChange} className="md:col-span-4" required />
                                <Select label="Estado" name="state" value={formData.state} onChange={handleChange} className="md:col-span-2" required>
                                    <option value="">Selecione</option>
                                    {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex gap-3">
                        <button type="button" onClick={() => router.push("/clients/list")} className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold">Cancelar</button>
                        <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 flex items-center gap-2"><Save className="h-5 w-5" /> Atualizar Cliente</button>
                    </div>
                </form>
            </div>
        </div>
    );
}