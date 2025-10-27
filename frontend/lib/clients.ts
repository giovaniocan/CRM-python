import { API_URL } from "./apiConfig";
import type { NewClient } from "./definitions";

export async function createClient(clientData: NewClient) {
  try {
    const response = await fetch(`${API_URL}/clients/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.detail ||
        Object.values(errorData).flat().join(", ") ||
        "Erro ao criar cliente";
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}

export async function updateClient(clientId: number, clientData: NewClient) {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar cliente");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
}

export async function deleteClient(clientId: number) {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao deletar cliente");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw error;
  }
}

export async function listClients() {
  try {
    const response = await fetch(`${API_URL}/clients/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

export async function getClient(clientId: number) {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar cliente");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
}
