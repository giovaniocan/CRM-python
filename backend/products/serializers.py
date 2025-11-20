# backend/products/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # Inclui a propriedade 'is_low_stock' do modelo
    is_low_stock = serializers.ReadOnlyField() 

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 
            'quantity_in_stock', 'low_stock_threshold', 'is_low_stock',
            'created_at', 'updated_at'
        ]