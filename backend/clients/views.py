# backend/clients/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('id')
    serializer_class = ClientSerializer

    @action(detail=False, methods=['get'])
    def metrics(self, request):
        """Retorna métricas de clientes."""
        now = timezone.now()
        # Conta clientes criados neste mês e ano
        new_this_month = self.queryset.filter(
            created_at__month=now.month, 
            created_at__year=now.year
        ).count()
        
        total_clients = self.queryset.count()
        
        return Response({
            'new_this_month': new_this_month,
            'total_clients': total_clients
        })