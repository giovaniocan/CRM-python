# backend/products/models.py
from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # --- Campos essenciais para o seu alerta ---
    quantity_in_stock = models.IntegerField(
        default=0, 
        verbose_name="Quantidade em Estoque"
    )
    low_stock_threshold = models.IntegerField(
        default=10, 
        verbose_name="Nível Mínimo de Estoque (Alerta)"
    )
    # ----------------------------------------------

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    @property
    def is_low_stock(self):
        """Propriedade para verificar se o estoque está baixo."""
        return self.quantity_in_stock <= self.low_stock_threshold