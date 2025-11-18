import { API_URL } from "./apiConfig";
import type { NewEmployee } from "./definitions";

export async function createEmployee(employeeData: NewEmployee) {
    try {
        const response = await fetch(`${API_URL}/employees/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage =
                errorData.detail ||
                Object.values(errorData).flat().join(", ") ||
                "Erro ao criar funcionário";
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        throw error;
    }
}

export async function updateEmployee(
    employeeId: number,
    employeeData: NewEmployee
) {
    try {
        const response = await fetch(`${API_URL}/employees/${employeeId}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok) throw new Error("Erro ao atualizar funcionário");
        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
        throw error;
    }
}

export async function deleteEmployee(employeeId: number) {
    try {
        const response = await fetch(`${API_URL}/employees/${employeeId}/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erro ao deletar funcionário");
        
        // CORREÇÃO: Não tenta ler JSON se for 204 No Content
        if (response.status === 204) {
            return { success: true };
        }
        
        return await response.json();
    } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        throw error;
    }
}

export async function listEmployees() {
    try {
        const response = await fetch(`${API_URL}/employees/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erro ao buscar funcionários");
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        throw error;
    }
}

export async function getEmployee(employeeId: number) {
    try {
        const response = await fetch(`${API_URL}/employees/${employeeId}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erro ao buscar funcionário");
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        throw error;
    }
}