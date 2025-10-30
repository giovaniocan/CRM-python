from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'cpf_cnpj', 'rg', 'email', 'phone', 'address', 'number', 'complement', 'neighborhood', 'city', 'state', 'zip_code', 'created_at', 'updated_at']