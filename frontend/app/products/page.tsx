// frontend/app/products/page.tsx
import Link from "next/link";
import { Package, PlusCircle } from "lucide-react";

export default function ProdutosPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Gestão de Produtos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/products/list"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-orange-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Listar Produtos
            </h2>
            <p className="mt-2 text-gray-600">
              Visualizar, editar, remover e monitorar o estoque dos produtos.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-orange-600 group-hover:underline">
            Acessar listagem &rarr;
          </span>
        </Link>

        <Link
          href="/products/create"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Cadastrar Novo Produto
            </h2>
            <p className="mt-2 text-gray-600">
              Adicionar um novo item ao catálogo de produtos do sistema.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-amber-600 group-hover:underline">
            Iniciar cadastro &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}