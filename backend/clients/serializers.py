from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'cpf_cnpj', 'email', 'phone', 'created_at', 'updated_at']
    
    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O nome é obrigatório.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("O nome deve ter pelo menos 2 caracteres.")
        return value.strip()
    
    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O email é obrigatório.")
        return value.strip().lower()
    
    def validate_cpf_cnpj(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O CPF/CNPJ é obrigatório.")
        return value.strip()
    
    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O telefone é obrigatório.")
        return value.strip()