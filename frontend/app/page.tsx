export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Bem-vindo ao Sistema, Falcao!
      </h2>

      <p className="mb-6 text-gray-600">
        Aqui está um resumo rápido da sua operação.
      </p>

      {/* Grid de Cards de Exemplo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Vendas Hoje */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Vendas (Hoje)</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            R$ 1.250,00
          </div>
          <div className="mt-1 text-sm text-green-600">+5% vs ontem</div>
        </div>

        {/* Card 2: Clientes Novos */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Novos Clientes (Mês)
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900">12</div>
          <div className="mt-1 text-sm text-gray-500">Total: 142</div>
        </div>

        {/* Card 3: Produtos Baixo Estoque */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Produtos com Baixo Estoque
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-900">3</div>
          <div className="mt-1 text-sm text-red-600">
            Requer atenção imediata
          </div>
        </div>
      </div>
    </div>
  );
}
