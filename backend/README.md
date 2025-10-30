# Backend - Sistema de Vendas ERP

## 📋 Sobre o Backend

Este é o backend do sistema ERP de vendas, desenvolvido com **Django 5.2.7** e **Django REST Framework**. O backend fornece uma API RESTful completa para gerenciar clientes, funcionários, produtos, fornecedores e vendas.

## 🏗️ Arquitetura

### Framework e Tecnologias

- **Django 5.2.7** - Framework web Python
- **Django REST Framework 3.16.1** - API REST
- **django-cors-headers 4.9.0** - CORS para comunicação com frontend
- **SQLite3** - Banco de dados (desenvolvimento)

### Apps Django

#### 1. **clients** - Gestão de Clientes

- Cadastro completo de clientes (PF e PJ)
- Validação de CPF/CNPJ
- Endereço completo com CEP
- Campos: nome, CPF/CNPJ, RG, email, telefone, endereço completo

#### 2. **employees** - Gestão de Funcionários

- Cadastro de funcionários
- Controle de departamentos
- Campos: nome, email, departamento

#### 3. **products** - Catálogo de Produtos

- _Em desenvolvimento_
- Gestão de produtos e estoque

#### 4. **suppliers** - Fornecedores

- _Em desenvolvimento_
- Gestão de fornecedores

#### 5. **sellings** - Vendas e Transações

- _Em desenvolvimento_
- Processo de vendas
- Relatórios e métricas

## 🚀 Instalação e Configuração

### Pré-requisitos

- Python 3.12+
- pip (gerenciador de pacotes Python)

### 1. Clone e Navegue para o Diretório

```bash
git clone <url-do-repositorio>
cd integrador-next/Back
```

### 2. Crie e Ative o Ambiente Virtual

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

### 3. Instale as Dependências

```bash
pip install -r requirements.txt
```

### 4. Configure o Banco de Dados

```bash
# Executar migrações
python manage.py migrate

# Criar superusuário (opcional)
python manage.py createsuperuser
```

### 5. Inicie o Servidor

```bash
python manage.py runserver
```

O servidor estará disponível em `http://localhost:8000`

## 📊 Modelos de Dados

### Cliente (Client)

```python
class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    cpf_cnpj = models.CharField(max_length=14)
    rg = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=100)
    number = models.CharField(max_length=10, blank=True, null=True)
    complement = models.CharField(max_length=100, blank=True, null=True)
    neighborhood = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=9, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Funcionário (Employee)

```python
class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

## 🌐 API Endpoints

### Base URL

```
http://localhost:8000/api/
```

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

## 🔧 Comandos Úteis

```bash
# Executar migrações
python manage.py migrate

# Criar migrações
python manage.py makemigrations

# Criar superusuário
python manage.py createsuperuser

# Abrir shell Django
python manage.py shell

# Executar testes
python manage.py test

# Coletar arquivos estáticos
python manage.py collectstatic
```

## ⚙️ Configurações

### CORS

O CORS está configurado para permitir requisições do frontend:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
```

### Apps Instalados

```python
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'employees',
    'clients',
]
```

## 📝 Próximos Passos

- [ ] Implementar modelos de Produtos
- [ ] Implementar modelos de Fornecedores
- [ ] Implementar modelos de Vendas
- [ ] Adicionar autenticação JWT
- [ ] Implementar filtros e paginação
- [ ] Adicionar validações customizadas
- [ ] Implementar testes automatizados
- [ ] Configurar PostgreSQL para produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido pela equipe de desenvolvimento como parte do projeto integrador da faculdade Donaduzzi 4º período.**
