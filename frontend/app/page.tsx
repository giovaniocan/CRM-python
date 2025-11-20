"use client";

import { useEffect, useState } from "react";
import { getLowStockAlerts } from "@/lib/products";
import { getClientMetrics } from "@/lib/dashboard";

export default function HomePage() {
  // Estados
  const [lowStockCount, setLowStockCount] = useState(0);
  const [clientMetrics, setClientMetrics] = useState({ new_this_month: 0, total_clients: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Busca Produtos (Estoque) e Clientes em paralelo
        const [stockData, clientsData] = await Promise.all([
          getLowStockAlerts(),
          getClientMetrics()
        ]);

        setLowStockCount(stockData.count);
        setClientMetrics(clientsData);
        
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Bem-vindo ao Sistema, Falcao!
      </h2>

      <p className="mb-6 text-gray-600">
        Aqui está um resumo atualizado da sua operação.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Vendas (ESTÁTICO - Em breve) */}
        <div className="rounded-lg border bg-gray-50 p-5 shadow-sm opacity-70">
          <div className="text-sm font-medium text-gray-500">Vendas (Hoje)</div>
          <div className="mt-2 text-3xl font-bold text-gray-400">
            --
          </div>
          <div className="mt-1 text-sm text-gray-400">
            Módulo em desenvolvimento
          </div>
        </div>

        {/* Card 2: Clientes Novos (DINÂMICO) */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Novos Clientes (Mês)
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {loading ? "..." : clientMetrics.new_this_month}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Total Geral: {loading ? "..." : clientMetrics.total_clients}
          </div>
        </div>

        {/* Card 3: Produtos Baixo Estoque (DINÂMICO) */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Produtos com Baixo Estoque
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {loading ? "..." : lowStockCount}
          </div>
          <div className={`mt-1 text-sm ${
            !loading && lowStockCount > 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {loading
              ? "Carregando..."
              : lowStockCount > 0
              ? "Requer atenção imediata"
              : "Estoque saudável"}
          </div>
        </div>

      </div>
    </div>
  );
}