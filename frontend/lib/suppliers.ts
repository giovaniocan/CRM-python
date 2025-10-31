// Adicione estes tipos ao arquivo frontend/lib/definitions.ts

import { API_URL } from "./apiConfig";
import type { NewSupplier } from "./definitions";

export async function createSupplier(supplierData: NewSupplier) {
  try {
    const response = await fetch(`${API_URL}/suppliers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplierData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.detail ||
        Object.values(errorData).flat().join(", ") ||
        "Erro ao criar fornecedor";
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    throw error;
  }
}

export async function updateSupplier(
  supplierId: number,
  supplierData: NewSupplier
) {
  try {
    const response = await fetch(`${API_URL}/suppliers/${supplierId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplierData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar fornecedor");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    throw error;
  }
}

export async function deleteSupplier(supplierId: number) {
  try {
    const response = await fetch(`${API_URL}/suppliers/${supplierId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao deletar fornecedor");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar fornecedor:", error);
    throw error;
  }
}

export async function listSuppliers() {
  try {
    const response = await fetch(`${API_URL}/suppliers/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar fornecedores");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    throw error;
  }
}

export async function getSupplier(supplierId: number) {
  try {
    const response = await fetch(`${API_URL}/suppliers/${supplierId}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar fornecedor");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
    throw error;
  }
}
