from django.contrib import admin
from .models import Service, SubService, Order, OrderItem


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(SubService)
class SubServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "service", "amount", "labor_rate"]
    list_filter = ["service"]
    search_fields = ["name"]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "customer_email", "order_date", "total_cost"]
    list_filter = ["order_date"]
    search_fields = ["customer__username", "customer_email"]
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["order", "subservice", "total_cost"]
