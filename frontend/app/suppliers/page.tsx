import Link from "next/link";
import { Building2, PlusCircle } from "lucide-react";

export default function FornecedoresPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Gestão de Fornecedores
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/suppliers/list"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Listar Fornecedores
            </h2>
            <p className="mt-2 text-gray-600">
              Visualizar, editar e remover fornecedores já cadastrados no
              sistema.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-green-600 group-hover:underline">
            Acessar listagem &rarr;
          </span>
        </Link>

        <Link
          href="/suppliers/create"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Cadastrar Novo Fornecedor
            </h2>
            <p className="mt-2 text-gray-600">
              Adicionar um novo fornecedor à base de dados do sistema.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-emerald-600 group-hover:underline">
            Iniciar cadastro &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
