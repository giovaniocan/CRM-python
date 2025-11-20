// frontend/app/products/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewProduct } from "@/lib/definitions";
import { createProduct } from "@/lib/products";
import {
  ArrowLeft,
  Save,
  Package,
  DollarSign,
  Archive,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Componente Input (copiado de seus outros arquivos 'create') ---
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
            focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none
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
// --- Fim do Componente Input ---

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewProduct>({
    name: "",
    description: "",
    price: "0.00",
    quantity_in_stock: 0,
    low_stock_threshold: 10,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      toast.success("Produto criado com sucesso!");
      setTimeout(() => router.push("/products/list"), 1500);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error(
        "Erro ao criar produto. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-50 via-white to-orange-50/30">
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
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Título */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Novo Produto</h1>
          <p className="text-gray-600">
            Preencha as informações do item para cadastrá-lo no sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Card de Informações */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-orange-100 rounded-xl">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Dados do Produto
                </h2>
                <p className="text-sm text-gray-500">
                  Informações básicas e de estoque
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <Input
                label="Nome do Produto"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Teclado Mecânico RGB"
                icon={<Package className="h-5 w-5" />}
                className="md:col-span-6"
                required
              />

              <div className="md:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Descrição (Opcional)
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Detalhes do produto, especificações, etc."
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-gray-300"
                  />
                </div>
              </div>

              <Input
                label="Preço de Venda (R$)"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0,00"
                icon={<DollarSign className="h-5 w-5" />}
                className="md:col-span-2"
                required
              />

              <Input
                label="Qtd. em Estoque"
                name="quantity_in_stock"
                type="number"
                min="0"
                value={formData.quantity_in_stock}
                onChange={handleChange}
                placeholder="0"
                icon={<Archive className="h-5 w-5" />}
                className="md:col-span-2"
                required
              />

              <Input
                label="Nível Mínimo (Alerta)"
                name="low_stock_threshold"
                type="number"
                min="0"
                value={formData.low_stock_threshold}
                onChange={handleChange}
                placeholder="10"
                icon={<AlertTriangle className="h-5 w-5" />}
                className="md:col-span-2"
                required
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Dica:</span> O alerta será ativado
              quando a "Qtd. em Estoque" for igual ou menor que o "Nível
              Mínimo".
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-100"
              >
                <Save className="h-5 w-5" />
                Salvar Produto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}