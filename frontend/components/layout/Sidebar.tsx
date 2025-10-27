"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Building,
  Truck,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";

type SidebarProps = {
  isOpen: boolean;
};

const navLinks = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/clients", label: "Clientes", icon: Users },
  { href: "/employees", label: "Funcionários", icon: Building },
  { href: "/suppliers", label: "Fornecedores", icon: Truck },
  { href: "/products", label: "Produtos", icon: Package },
  { href: "/sellings", label: "Vendas", icon: ShoppingCart },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-screen flex-col overflow-y-auto border-r bg-white py-4
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 px-5" : "w-20 px-3"}`}
    >
      <Link
        href="/"
        className={`flex items-center overflow-hidden
          ${isOpen ? "justify-start" : "justify-center"}`}
      >
        <Image
          src="/mojuro-icon.png"
          alt="Mojuro Logo"
          width={100}
          height={100}
          className="h-10 w-10 shrink-0"
          quality={100}
          priority
        />
        {isOpen && (
          <span
            className={`ml-3 text-2xl font-bold text-indigo-600 whitespace-nowrap
            transition-opacity duration-200
            ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            Mojuro ERP
          </span>
        )}
      </Link>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex transform items-center rounded-lg px-3 py-2
                  transition-colors duration-300 ease-in-out overflow-hidden
                  ${isOpen ? "" : "justify-center"}
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                title={isOpen ? "" : link.label}
              >
                <link.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {isOpen && (
                  <span className="mx-2 text-sm font-medium whitespace-nowrap">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="-mx-3">
          <Link
            href="#"
            className={`flex transform items-center rounded-lg px-3 py-2
              text-gray-600 transition-colors duration-300 ease-in-out
              overflow-hidden hover:bg-gray-100 hover:text-gray-700
              ${isOpen ? "" : "justify-center"}`}
            title={isOpen ? "" : "Sair"}
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            {isOpen && (
              <span className="mx-2 text-sm font-medium whitespace-nowrap">
                Sair
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
