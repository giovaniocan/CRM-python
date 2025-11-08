from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeAPITests(APITestCase):
    """
    Suite de testes para a API de Employees.
    """

    def setUp(self):
        """
        Configura dados iniciais para os testes.
        Cria dois funcionários no banco de dados.
        """
        self.employee1 = Employee.objects.create(
            name="Funcionario Teste 1",
            email="teste1@empresa.com",
            department="TI"
        )
        self.employee2 = Employee.objects.create(
            name="Funcionario Teste 2",
            email="teste2@empresa.com",
            department="Vendas"
        )
        
        # URLs da API
        # O basename 'employee' é definido em backend/employees/urls.py
        self.list_create_url = reverse('employee-list')
        self.detail_url = reverse('employee-detail', kwargs={'pk': self.employee1.id})

    def test_list_employees(self):
        """
        Testa se a listagem de funcionários (GET /api/employees/) funciona.
        """
        response = self.client.get(self.list_create_url)
        
        # Espera uma resposta 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Espera que os dois funcionários criados no setUp sejam retornados
        self.assertEqual(len(response.data), 2)
        
        # Verifica se os dados do primeiro funcionário batem
        self.assertEqual(response.data[0]['name'], self.employee1.name)

    def test_retrieve_employee(self):
        """
        Testa se a busca de um funcionário específico (GET /api/employees/<id>/) funciona.
        """
        response = self.client.get(self.detail_url)
        
        # Espera uma resposta 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Serializa o objeto do banco para comparar com a resposta da API
        expected_data = EmployeeSerializer(self.employee1).data
        self.assertEqual(response.data, expected_data)
        self.assertEqual(response.data['name'], self.employee1.name)

    def test_create_employee_valid(self):
        """
        Testa a criação de um novo funcionário com dados válidos (POST /api/employees/).
        """
        data = {
            "name": "Novo Funcionario",
            "email": "novo@empresa.com",
            "department": "RH"
        }
        
        response = self.client.post(self.list_create_url, data, format='json')
        
        # Espera uma resposta 201 CREATED
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verifica se o número de funcionários no banco aumentou para 3
        self.assertEqual(Employee.objects.count(), 3)
        
        # Verifica se o funcionário criado tem o nome correto
        self.assertEqual(response.data['name'], "Novo Funcionario")

    def test_create_employee_invalid_duplicate_email(self):
        """
        Testa a criação de um funcionário com email duplicado (inválido).
        """
        data = {
            "name": "Funcionario Duplicado",
            "email": self.employee1.email,  # Email já existente
            "department": "Financeiro"
        }
        
        response = self.client.post(self.list_create_url, data, format='json')
        
        # Espera uma resposta 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Verifica se a chave 'email' está no erro retornado
        self.assertIn('email', response.data)
        
        # Garante que o funcionário não foi criado
        self.assertEqual(Employee.objects.count(), 2)

    def test_update_employee(self):
        """
        Testa a atualização de um funcionário (PUT /api/employees/<id>/).
        """
        data = {
            "name": "Nome Atualizado",
            "email": "emailatualizado@empresa.com",
            "department": "Marketing"
        }
        
        response = self.client.put(self.detail_url, data, format='json')
        
        # Espera uma resposta 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Recarrega o objeto do banco de dados
        self.employee1.refresh_from_db()
        
        # Verifica se os dados foram atualizados
        self.assertEqual(self.employee1.name, "Nome Atualizado")
        self.assertEqual(self.employee1.department, "Marketing")
        self.assertEqual(response.data['email'], "emailatualizado@empresa.com")

    def test_delete_employee(self):
        """
        Testa a exclusão de um funcionário (DELETE /api/employees/<id>/).
        """
        response = self.client.delete(self.detail_url)
        
        # Espera uma resposta 204 NO CONTENT
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verifica se o número de funcionários no banco diminuiu para 1
        self.assertEqual(Employee.objects.count(), 1)
        
        # Verifica se o funcionário com aquele ID não existe mais
        self.assertFalse(Employee.objects.filter(id=self.employee1.id).exists())
