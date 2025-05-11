import strawberry
from typing import List, Optional
from .models import Service, SubService, Order
from django.contrib.auth.models import User


@strawberry.type
class ServiceType:
    id: int
    name: str


@strawberry.type
class SubServiceType:
    id: int
    name: str
    amount: Optional[float]
    labor_rate: Optional[float]
    service: ServiceType


@strawberry.type
class OrderType:
    id: int
    customer_email: str
    customer_phone: str
    customer_address: str
    order_date: str
    subservice: SubServiceType


# Queries
@strawberry.type
class Query:
    @strawberry.field
    def all_services(self) -> List[ServiceType]:
        return Service.objects.all()

    @strawberry.field
    def all_subservices(self) -> List[SubServiceType]:
        return SubService.objects.select_related("service").all()

    @strawberry.field
    def all_orders(self) -> List[OrderType]:
        return Order.objects.select_related("subservice__service").all()

    @strawberry.field
    def service_by_id(self, id: int) -> Optional[ServiceType]:
        return Service.objects.filter(pk=id).first()

    @strawberry.field
    def subservice_by_id(self, id: int) -> Optional[SubServiceType]:
        return SubService.objects.filter(pk=id).first()

    @strawberry.field
    def order_by_id(self, id: int) -> Optional[OrderType]:
        return Order.objects.filter(pk=id).first()


# Mutations
@strawberry.type
class Mutation:
    @strawberry.mutation
    def place_order(
        self,
        customer_email: str,
        customer_phone: str,
        customer_address: str,
        subservice_id: int,
    ) -> OrderType:
        subservice = SubService.objects.get(pk=subservice_id)
        order = Order.objects.create(
            customer_email=customer_email,
            customer_phone=customer_phone,
            customer_address=customer_address,
            subservice=subservice,
        )
        return order

    @strawberry.mutation
    def update_order(
        self,
        id: int,
        customer_email: str,
        customer_phone: str,
        customer_address: str,
    ) -> OrderType:
        order = Order.objects.get(pk=id)
        order.customer_email = customer_email
        order.customer_phone = customer_phone
        order.customer_address = customer_address
        order.save()
        return order

    @strawberry.mutation
    def delete_order(self, id: int) -> bool:
        order = Order.objects.get(pk=id)
        order.delete()
        return True


schema = strawberry.Schema(query=Query, mutation=Mutation)
