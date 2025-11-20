# backend/products/views.py
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

    # Este é o seu endpoint customizado para o alerta:
    # Ele estará acessível em /api/products/low-stock/
    @action(detail=False, methods=['get'], url_path='low-stock')
    def low_stock_alert(self, request):
        """
        Retorna uma contagem e a lista de produtos
        onde o estoque (quantity_in_stock) é menor ou igual 
        ao nível mínimo (low_stock_threshold).
        """
        low_stock_products = self.get_queryset().filter(
            quantity_in_stock__lte=F('low_stock_threshold')
        )
        
        count = low_stock_products.count()
        serializer = self.get_serializer(low_stock_products, many=True)
        
        return Response({
            'count': count,
            'results': serializer.data
        }, status=status.HTTP_200_OK)