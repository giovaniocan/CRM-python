'use client';

import { Menu } from 'lucide-react';

type HeaderProps = {
  onToggleSidebar: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="ml-4 text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600">
          Usuário logado: <span className="font-bold text-gray-900">Falcao</span>
        </span>
      </div>
    </header>
  );
}