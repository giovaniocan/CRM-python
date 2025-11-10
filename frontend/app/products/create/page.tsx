"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, PackagePlus, Save } from "lucide-react";

import { createProduct } from "@/lib/products";
import { listSuppliers } from "@/lib/suppliers";
import type { Supplier } from "@/lib/definitions";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  supplier: string;
};

export default function CriarProdutoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    supplier: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const data = await listSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        toast.error("Não foi possível carregar fornecedores.");
      }
    }

    fetchSuppliers();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = parseFloat(formData.price.replace(",", "."));
    const stock = parseInt(formData.stock_quantity, 10);
    const supplierId = formData.supplier ? Number(formData.supplier) : null;

    if (Number.isNaN(price)) {
      toast.error("Informe um preço válido.");
      return;
    }

    if (Number.isNaN(stock) || stock < 0) {
      toast.error("Informe uma quantidade em estoque válida.");
      return;
    }

    if (formData.supplier && Number.isNaN(supplierId)) {
      toast.error("Selecione um fornecedor válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price,
        stock_quantity: stock,
        supplier: supplierId,
      });

      toast.success("Produto cadastrado com sucesso!");
      router.push("/products/list");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error(
        "Erro ao criar produto. Verifique os dados e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
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

      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        type="button"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-100 rounded-xl">
          <PackagePlus className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
          <p className="text-sm text-gray-500">
            Preencha as informações abaixo para cadastrar um novo produto.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Nome do Produto
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Cadeira Ergonômica"
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalhes do produto, materiais, medidas, etc."
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
              Preço (R$)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="0,00"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="stock_quantity"
              className="block text-sm font-semibold text-gray-700"
            >
              Quantidade em Estoque
            </label>
            <input
              id="stock_quantity"
              name="stock_quantity"
              type="number"
              min="0"
              step="1"
              required
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="supplier"
            className="block text-sm font-semibold text-gray-700"
          >
            Fornecedor
          </label>
          <select
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, supplier: event.target.value }))
            }
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none hover:border-gray-300"
          >
            <option value="">Selecione um fornecedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => router.push("/products")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}

