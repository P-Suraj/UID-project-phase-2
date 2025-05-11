from django.db import models
from django.contrib.auth.models import User


class Service(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class SubService(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    labor_rate = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    def __str__(self):
        return f"{self.name} ({self.service.name})"


class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    subservice = models.ForeignKey(SubService, on_delete=models.CASCADE)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=10)
    customer_address = models.TextField()
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"
