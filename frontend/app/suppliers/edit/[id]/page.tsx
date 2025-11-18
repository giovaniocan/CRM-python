"use client";

import { useState, useEffect, use } from "react"; // Importe 'use'
import { useRouter } from "next/navigation";
import type { NewSupplier } from "@/lib/definitions";
import { getSupplier, updateSupplier } from "@/lib/suppliers";
import { ArrowLeft, Save, Building2, MapPin, Mail, Phone, Home, CreditCard } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ... (Mantenha os componentes Input e Select iguais aos outros arquivos se preferir, ou simplificados)
// Vou usar versões simplificadas aqui para brevidade, mas mantenha a estilização que já existe se tiver.

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: React.ReactNode; error?: string; };
function Input({ label, name, icon, error, className = "", ...props }: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">{icon}</div>}
        <input id={name} name={name} {...props} className={`w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 ${icon ? "pl-11" : ""} text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none hover:border-gray-300`} />
      </div>
    </div>
  );
}
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode; };
function Select({ label, name, children, className = "", ...props }: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <select id={name} name={name} {...props} className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none">{children}</select>
    </div>
  )
}
const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export default function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"company" | "address">("company");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<NewSupplier>({
    name: "", cnpj: "", email: "", phone: "", zip_code: "", address: "", number: "", complement: "", neighborhood: "", city: "", state: "",
  });

  useEffect(() => {
    async function loadSupplier() {
      if (!id) return;
      try {
        const supplier = await getSupplier(Number(id));
        setFormData({
          name: supplier.name, cnpj: supplier.cnpj, email: supplier.email, phone: supplier.phone,
          zip_code: supplier.zip_code || "", address: supplier.address, number: supplier.number || "",
          complement: supplier.complement || "", neighborhood: supplier.neighborhood || "", city: supplier.city, state: supplier.state,
        });
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error);
        toast.error("Erro ao carregar fornecedor.");
      } finally {
        setLoading(false);
      }
    }
    loadSupplier();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSupplier(Number(id), formData);
      toast.success("Fornecedor atualizado!");
      setTimeout(() => router.push("/suppliers/list"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao atualizar fornecedor.");
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="bg-linear-to-br from-gray-50 via-white to-green-50/30">
      <ToastContainer position="bottom-right" autoClose={5000} />
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Fornecedor</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex gap-2">
            <button type="button" onClick={() => setActiveTab("company")} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'company' ? 'bg-white text-green-700 shadow' : 'text-gray-600'}`}>Dados da Empresa</button>
            <button type="button" onClick={() => setActiveTab("address")} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'address' ? 'bg-white text-green-700 shadow' : 'text-gray-600'}`}>Endereço</button>
          </div>

          {activeTab === "company" && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-6 gap-6">
              <Input label="Razão Social" name="name" value={formData.name} onChange={handleChange} icon={<Building2 className="h-5 w-5" />} className="md:col-span-6" required />
              <Input label="CNPJ" name="cnpj" value={formData.cnpj} onChange={handleChange} icon={<CreditCard className="h-5 w-5" />} className="md:col-span-3" required />
              <Input label="E-mail" name="email" value={formData.email} onChange={handleChange} icon={<Mail className="h-5 w-5" />} className="md:col-span-3" required />
              <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} icon={<Phone className="h-5 w-5" />} className="md:col-span-3" required />
            </div>
          )}

          {activeTab === "address" && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="md:col-span-2"><label className="text-sm font-semibold text-gray-700">CEP</label><input name="zip_code" value={formData.zip_code} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" /></div>
              <Input label="Logradouro" name="address" value={formData.address} onChange={handleChange} icon={<Home className="h-5 w-5" />} className="md:col-span-3" required />
              <Input label="Número" name="number" value={formData.number} onChange={handleChange} className="md:col-span-1" />
              <Input label="Complemento" name="complement" value={formData.complement} onChange={handleChange} className="md:col-span-3" />
              <Input label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="md:col-span-3" />
              <Input label="Cidade" name="city" value={formData.city} onChange={handleChange} className="md:col-span-4" required />
              <Select label="Estado" name="state" value={formData.state} onChange={handleChange} className="md:col-span-2">
                <option value="">Selecione</option>{ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </Select>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button type="button" onClick={() => router.push("/suppliers/list")} className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold">Cancelar</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 flex items-center gap-2"><Save className="h-5 w-5" /> Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}