from rest_framework import serializers
from .models import Supplier

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = [
            'id', 'name', 'cnpj', 'email', 'phone', 
            'address', 'number', 'complement', 'neighborhood', 
            'city', 'state', 'zip_code', 'created_at', 'updated_at'
        ]