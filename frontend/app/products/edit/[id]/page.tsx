"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, PackageCheck, Save } from "lucide-react";

import { getProduct, updateProduct } from "@/lib/products";
import { listSuppliers } from "@/lib/suppliers";
import type { Product, Supplier } from "@/lib/definitions";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  supplier: string;
};

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    supplier: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    if (!productId) {
      toast.error("Produto inválido.");
      router.replace("/products/list");
      return;
    }

    async function fetchProduct() {
      try {
        const data: Product = await getProduct(productId);
        setFormData({
          name: data.name,
          description: data.description ?? "",
          price: data.price.toString(),
          stock_quantity: data.stock_quantity.toString(),
          supplier: data.supplier ? data.supplier.toString() : "",
        });
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        toast.error("Não foi possível carregar o produto.");
        router.replace("/products/list");
      } finally {
        setLoading(false);
      }
    }

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
    fetchProduct();
  }, [productId, router]);

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
      await updateProduct(productId, {
        name: formData.name,
        description: formData.description,
        price,
        stock_quantity: stock,
        supplier: supplierId,
      });

      toast.success("Produto atualizado com sucesso!");
      router.push("/products/list");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error(
        "Erro ao atualizar produto. Verifique os dados e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-3xl">
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
        <div className="p-2.5 bg-emerald-100 rounded-xl">
          <PackageCheck className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
          <p className="text-sm text-gray-500">
            Atualize as informações necessárias e salve as alterações.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            ID do produto: <span className="font-semibold text-gray-600">{productId}</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
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
            onClick={() => router.push("/products/list")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

