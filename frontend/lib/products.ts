// frontend/lib/products.ts
import { API_URL } from "./apiConfig";
import type { LowStockResponse, Product, NewProduct } from "./definitions";

// --- Função de Alerta (já existe) ---
export async function getLowStockAlerts(): Promise<LowStockResponse> {
  try {
    const response = await fetch(`${API_URL}/products/low-stock/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar alertas de estoque baixo");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar alertas de estoque:", error);
    throw error;
  }
}

// --- Novas Funções de CRUD ---

export async function createProduct(productData: NewProduct) {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.detail ||
        Object.values(errorData).flat().join(", ") ||
        "Erro ao criar produto";
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}

export async function updateProduct(
  productId: number,
  productData: NewProduct
) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar produto");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}

export async function deleteProduct(productId: number) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // O Django ModelViewSet retorna 204 NO CONTENT na exclusão,
    // que não tem corpo JSON. Por isso, não usamos response.json()
    if (!response.ok) throw new Error("Erro ao deletar produto");
    return { success: true }; // Retorna um sucesso genérico
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
}

export async function listProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export async function getProduct(productId: number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao buscar produto");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}