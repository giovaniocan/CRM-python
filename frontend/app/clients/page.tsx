import Link from "next/link";
import { Users, UserPlus } from "lucide-react";

export default function ClientesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Gestão de Clientes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/clients/list"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Listar Clientes
            </h2>
            <p className="mt-2 text-gray-600">
              Visualizar, editar e remover clientes já cadastrados no sistema.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-indigo-600 group-hover:underline">
            Acessar listagem &rarr;
          </span>
        </Link>

        <Link
          href="/clients/create"
          className="group flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-600"
        >
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <UserPlus className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Cadastrar Novo Cliente
            </h2>
            <p className="mt-2 text-gray-600">
              Adicionar um novo cliente à base de dados do sistema.
            </p>
          </div>
          <span className="mt-6 text-sm font-medium text-blue-600 group-hover:underline">
            Iniciar cadastro &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
