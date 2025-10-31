# Sistema de Vendas ERP - Remake

## 📋 Sobre o Projeto

Este é um **remake moderno** de um sistema ERP legado, desenvolvido com tecnologias atuais e melhores práticas. O projeto visa modernizar e melhorar a experiência de um sistema de vendas existente, mantendo a funcionalidade essencial mas com uma arquitetura mais robusta e escalável.

### 🎯 Objetivos do Remake

- **Modernização**: Migração de tecnologias legadas para stack atual
- **Melhoria de Performance**: Arquitetura otimizada e responsiva
- **Melhor UX/UI**: Interface moderna e intuitiva
- **Manutenibilidade**: Código limpo e bem estruturado
- **Escalabilidade**: Preparado para crescimento futuro

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura **full-stack** moderna com separação clara entre frontend e backend:

### Backend (Django REST Framework)

- **Framework**: Django 5.2.7 + Django REST Framework
- **Banco de Dados**: SQLite (desenvolvimento)
- **API**: RESTful com CORS habilitado
- **Apps Django**:
  - `clients` - Gestão de clientes
  - `employees` - Gestão de funcionários
  - `products` - Catálogo de produtos
  - `suppliers` - Fornecedores
  - `sellings` - Vendas e transações

### Frontend (Next.js)

- **Framework**: Next.js 15.5.6 com App Router
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Lucide React (ícones)
- **Estado**: Context API para gerenciamento de estado

## 🚀 Funcionalidades

### Módulos Principais

- **Dashboard**: Visão geral com métricas e indicadores
- **Clientes**: Cadastro e gestão de clientes (CPF/CNPJ, endereço completo)
- **Funcionários**: Gestão de equipe e departamentos
- **Produtos**: Catálogo de produtos (em desenvolvimento)
- **Fornecedores**: Gestão de fornecedores (em desenvolvimento)
- **Vendas**: Processo de vendas e transações (em desenvolvimento)

### Características Técnicas

- ✅ Interface responsiva e moderna
- ✅ Sistema de notificações toast
- ✅ Validação de formulários
- ✅ API RESTful completa
- ✅ CORS configurado para desenvolvimento
- ✅ Estrutura modular e escalável

## 🛠️ Tecnologias Utilizadas

### Backend

- Python 3.12+
- Django 5.2.7
- Django REST Framework 3.16.1
- django-cors-headers 4.9.0
- SQLite3

### Frontend

- Node.js 20+
- Next.js 15.5.6
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Lucide React

## 📦 Instalação e Configuração

### Pré-requisitos

- Python 3.12+
- Node.js 20+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd integrador-next
```

### 1. Inicie o Banco de Dados (Docker)

Abra um terminal na raiz do projeto (onde está o arquivo `docker-compose.yml`) e inicie o contêiner do PostgreSQL:

```bash
docker-compose up -d
```

O banco estará disponível em **localhost:5432**.

---

## 2. Configuração do Backend (Django)

Execute estes comandos em um segundo terminal:

```bash
# Navegue para o diretório do backend
cd Back

# Crie e ative o ambiente virtual
python -m venv venv
```

**Ative o ambiente virtual:**

- **Windows (CMD/PowerShell):**
  ```bash
  venv\Scripts\activate
  ```

- **Windows (Git Bash):**
  ```bash
  source venv/Scripts/activate
  ```

- **Linux/Mac:**
  ```bash
  source venv/bin/activate
  ```

---

**Instale as dependências (incluindo o driver do PostgreSQL):**

```bash
pip install django djangorestframework django-cors-headers psycopg2-binary
```

---

**Execute as migrações (cria as tabelas no banco Docker):**

```bash
python manage.py migrate
```

---

**Inicie o servidor de desenvolvimento:**

```bash
python manage.py runserver
```

O backend estará disponível em **http://localhost:8000**.


### 3. Configuração do Frontend (Next.js)

```bash
# Navegue para o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
integrador-next/
├── Back/                    # Backend Django
│   ├── clients/            # App de clientes
│   ├── employees/          # App de funcionários
│   ├── products/           # App de produtos
│   ├── suppliers/          # App de fornecedores
│   ├── sellings/           # App de vendas
│   ├── config/             # Configurações Django
│   └── manage.py
├── frontend/               # Frontend Next.js
│   ├── app/                # App Router (Next.js 13+)
│   │   ├── clients/        # Páginas de clientes
│   │   ├── employees/      # Páginas de funcionários
│   │   ├── products/       # Páginas de produtos
│   │   ├── suppliers/      # Páginas de fornecedores
│   │   └── sellings/       # Páginas de vendas
│   ├── components/         # Componentes React
│   │   ├── layout/         # Componentes de layout
│   │   └── ui/             # Componentes de UI
│   ├── context/            # Context API
│   ├── lib/                # Utilitários e configurações
│   └── public/             # Arquivos estáticos
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend

```bash
python manage.py runserver          # Inicia o servidor de desenvolvimento
python manage.py migrate            # Executa migrações
python manage.py makemigrations     # Cria migrações
python manage.py createsuperuser    # Cria superusuário
python manage.py shell              # Abre shell Django
```

### Frontend

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
```

## 🌐 API Endpoints

### Clientes

- `GET /api/clients/` - Lista todos os clientes
- `POST /api/clients/` - Cria novo cliente
- `GET /api/clients/{id}/` - Busca cliente por ID
- `PUT /api/clients/{id}/` - Atualiza cliente
- `DELETE /api/clients/{id}/` - Remove cliente

### Funcionários

- `GET /api/employees/` - Lista todos os funcionários
- `POST /api/employees/` - Cria novo funcionário
- `GET /api/employees/{id}/` - Busca funcionário por ID
- `PUT /api/employees/{id}/` - Atualiza funcionário
- `DELETE /api/employees/{id}/` - Remove funcionário

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

Desenvolvido pela equipe de desenvolvimento como parte do projeto integrador da faculdade Donaduzzi 4º período.

---

**Nota**: Este é um projeto em desenvolvimento ativo. Algumas funcionalidades podem estar em construção.
