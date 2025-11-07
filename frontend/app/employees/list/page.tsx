"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { listEmployees, deleteEmployee } from "@/lib/employees";
import type { Employee } from "@/lib/definitions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListarFuncionariosPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const data = await listEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
                toast.error("Erro ao buscar funcionários.");
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId: number) => {
        if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
            try {
                await deleteEmployee(employeeId);
                setEmployees(employees.filter((employee) => employee.id !== employeeId));
                toast.success("Funcionário excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir funcionário:", error);
                toast.error("Erro ao excluir funcionário.");
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
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
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Funcionários Cadastrados
                </h1>
                <Link
                    href="/employees/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Novo Funcionário
                </Link>
            </div>

            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Departamento
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {employee.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {employee.department}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={`/employees/edit/${employee.id}`}
                                        className="text-purple-600 hover:text-purple-900 mr-4"
                                    >
                                        <Edit className="h-5 w-5 inline-block" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="h-5 w-5 inline-block" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}