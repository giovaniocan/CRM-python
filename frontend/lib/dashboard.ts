// frontend/lib/dashboard.ts
import { API_URL } from "./apiConfig";
import type { ClientMetrics } from "./definitions";

export async function getClientMetrics(): Promise<ClientMetrics> {
  try {
    const response = await fetch(`${API_URL}/clients/metrics/`, { 
        cache: 'no-store' 
    });
    if (!response.ok) return { new_this_month: 0, total_clients: 0 };
    return await response.json();
  } catch (error) {
    console.error("Erro client metrics:", error);
    return { new_this_month: 0, total_clients: 0 };
  }
}