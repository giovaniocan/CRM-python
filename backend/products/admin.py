from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "price",
        "stock_quantity",
        "supplier",
        "created_at",
    )
    search_fields = ("name", "supplier__name")
    list_filter = ("created_at", "supplier")
