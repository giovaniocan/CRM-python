import { API_URL } from "./apiConfig";
import type { NewProduct } from "./definitions";

export async function createProduct(productData: NewProduct) {
  const response = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      supplier: productData.supplier ?? null,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.detail ||
      Object.values(errorData).flat().join(", ") ||
      "Erro ao criar produto";
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function updateProduct(productId: number, productData: NewProduct) {
  const response = await fetch(`${API_URL}/products/${productId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      supplier: productData.supplier ?? null,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.detail ||
      Object.values(errorData).flat().join(", ") ||
      "Erro ao atualizar produto";
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function deleteProduct(productId: number) {
  const response = await fetch(`${API_URL}/products/${productId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.detail ||
      Object.values(errorData).flat().join(", ") ||
      "Erro ao deletar produto";
    throw new Error(errorMessage);
  }
}

export async function listProducts() {
  const response = await fetch(`${API_URL}/products/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}

export async function getProduct(productId: number) {
  const response = await fetch(`${API_URL}/products/${productId}/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produto");
  }

  return response.json();
}

