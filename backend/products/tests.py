from decimal import Decimal

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from suppliers.models import Supplier

from .models import Product


class ProductModelTest(TestCase):
    def test_str_returns_name(self):
        product = Product.objects.create(
            name="Produto Teste",
            description="Descrição",
            price=Decimal("99.99"),
            stock_quantity=10,
        )

        self.assertEqual(str(product), "Produto Teste")


class ProductAPITest(APITestCase):
    def setUp(self):
        self.base_url = reverse("product-list")
        self.supplier = Supplier.objects.create(
            name="Fornecedor XPTO",
            cnpj="12345678000190",
            email="contato@xpto.com",
            phone="11999999999",
            address="Rua A",
            number="123",
            complement="Sala 1",
            neighborhood="Centro",
            city="São Paulo",
            state="SP",
            zip_code="01000000",
        )

    def test_create_product_without_supplier(self):
        payload = {
            "name": "Produto Sem Fornecedor",
            "description": "Produto sem fornecedor associado",
            "price": "150.50",
            "stock_quantity": 5,
            "supplier": None,
        }

        response = self.client.post(self.base_url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        product = Product.objects.get()
        self.assertIsNone(product.supplier)
        self.assertEqual(product.price, Decimal("150.50"))

    def test_create_product_with_supplier(self):
        payload = {
            "name": "Produto Com Fornecedor",
            "description": "Produto com fornecedor",
            "price": "200.00",
            "stock_quantity": 3,
            "supplier": self.supplier.id,
        }

        response = self.client.post(self.base_url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        product = Product.objects.get()
        self.assertEqual(product.supplier, self.supplier)

    def test_list_products_includes_supplier_name(self):
        Product.objects.create(
            name="Produto 1",
            description="Produto listado",
            price=Decimal("50.00"),
            stock_quantity=10,
            supplier=self.supplier,
        )
        Product.objects.create(
            name="Produto 2",
            description="Outro produto",
            price=Decimal("75.00"),
            stock_quantity=4,
        )

        response = self.client.get(self.base_url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        first_product = response.data[0]
        self.assertIn("supplier_name", first_product)
        self.assertEqual(first_product["supplier"], self.supplier.id)
        self.assertEqual(first_product["supplier_name"], self.supplier.name)
