# Frontend - Sistema de Vendas ERP

## 📋 Sobre o Frontend

Este é o frontend do sistema ERP de vendas, desenvolvido com **Next.js 15.5.6** e **TypeScript**. O frontend oferece uma interface moderna e responsiva para gerenciar clientes, funcionários, produtos, fornecedores e vendas.

## 🏗️ Arquitetura

### Framework e Tecnologias

- **Next.js 15.5.6** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface
- **TypeScript 5** - Linguagem tipada
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones

### Estrutura de Pastas

```
frontend/
├── app/                    # App Router (Next.js 13+)
│   ├── clients/           # Páginas de clientes
│   │   ├── create/        # Criação de clientes
│   │   ├── edit/[id]/     # Edição de clientes
│   │   └── list/          # Listagem de clientes
│   ├── employees/         # Páginas de funcionários
│   ├── products/          # Páginas de produtos
│   ├── suppliers/         # Páginas de fornecedores
│   ├── sellings/          # Páginas de vendas
│   ├── settings/          # Configurações
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial (Dashboard)
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Cabeçalho
│   │   ├── Sidebar.tsx   # Barra lateral
│   │   ├── Footer.tsx    # Rodapé
│   │   └── LayoutWrapper.tsx
│   └── ui/               # Componentes de UI
│       └── Toast.tsx     # Componente de notificação
├── context/              # Context API
│   └── ToastContext.tsx  # Contexto de notificações
├── lib/                  # Utilitários e configurações
│   ├── apiConfig.ts      # Configuração da API
│   ├── clients.ts        # Serviços de clientes
│   ├── employees.ts      # Serviços de funcionários
│   ├── products.ts       # Serviços de produtos
│   ├── suppliers.ts      # Serviços de fornecedores
│   ├── sellings.ts       # Serviços de vendas
│   └── definitions.ts    # Definições de tipos
└── public/               # Arquivos estáticos
    ├── mojuro-icon.png
    └── mojuro-icon.svg
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### 1. Clone e Navegue para o Diretório

```bash
git clone <url-do-repositorio>
cd integrador-next/frontend
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O frontend estará disponível em `http://localhost:3000`

## 🎨 Funcionalidades da Interface

### Dashboard

- Visão geral com métricas importantes
- Cards informativos (vendas, clientes, estoque)
- Interface responsiva e moderna

### Módulos Implementados

#### ✅ Clientes

- Listagem de clientes
- Criação de novos clientes
- Edição de clientes existentes
- Formulário completo com validação
- Campos: nome, CPF/CNPJ, RG, email, telefone, endereço completo

#### ✅ Funcionários

- Listagem de funcionários
- Gestão de departamentos
- Interface de administração

#### 🚧 Produtos

- _Em desenvolvimento_
- Catálogo de produtos
- Gestão de estoque

#### 🚧 Fornecedores

- _Em desenvolvimento_
- Gestão de fornecedores

#### 🚧 Vendas

- _Em desenvolvimento_
- Processo de vendas
- Relatórios e métricas

### Características da UI/UX

- ✅ Design responsivo (mobile-first)
- ✅ Sistema de notificações toast
- ✅ Validação de formulários em tempo real
- ✅ Navegação intuitiva com sidebar
- ✅ Componentes reutilizáveis
- ✅ Tipagem TypeScript completa
- ✅ Loading states e feedback visual

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento com Turbopack
npm run build        # Build para produção com Turbopack
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint

# Com Turbopack (mais rápido)
npm run dev --turbopack
npm run build --turbopack
```

## 🔧 Configurações

### Next.js Config

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações do Next.js
};

export default nextConfig;
```

### Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🌐 Integração com Backend

### Configuração da API

```typescript
// lib/apiConfig.ts
export const API_BASE_URL = "http://localhost:8000/api";
```

### Exemplo de Uso

```typescript
// lib/clients.ts
import { API_BASE_URL } from "./apiConfig";

export const getClients = async () => {
  const response = await fetch(`${API_BASE_URL}/clients/`);
  return response.json();
};
```

## 📱 Responsividade

O frontend é totalmente responsivo e funciona em:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Design System

### Cores Principais

- **Primary**: Azul (#3B82F6)
- **Secondary**: Cinza (#6B7280)
- **Success**: Verde (#10B981)
- **Warning**: Amarelo (#F59E0B)
- **Error**: Vermelho (#EF4444)

### Tipografia

- **Font Family**: Inter (Google Fonts)
- **Headings**: Font weights 600-700
- **Body**: Font weight 400

## 📝 Próximos Passos

- [ ] Implementar módulo de Produtos
- [ ] Implementar módulo de Fornecedores
- [ ] Implementar módulo de Vendas
- [ ] Adicionar autenticação e autorização
- [ ] Implementar relatórios e dashboards avançados
- [ ] Adicionar testes automatizados
- [ ] Implementar PWA (Progressive Web App)
- [ ] Otimizar performance e SEO

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido pelo grupo 6 da faculdade Donaduzzi 4º período.**
