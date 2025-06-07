import strawberry
from typing import List, Optional
from .models import Service, Category, Order, OrderItem
from django.contrib.auth.models import User


@strawberry.type
class CategoryType:
    id: int
    name: str


@strawberry.type
class ServiceType:
    id: int
    name: str
    description: Optional[str]
    image_url: Optional[str]
    price: float
    category: CategoryType


@strawberry.type
class OrderItemType:
    id: int
    service: ServiceType
    quantity: int
    total_cost: float


@strawberry.type
class OrderType:
    id: int
    customer_email: str
    customer_phone: str
    customer_address: str
    order_date: str
    items: List[OrderItemType]

    @strawberry.field
    def total_cost(self) -> float:
        return sum(item.total_cost for item in self.items)


# Queries
@strawberry.type
class Query:
    @strawberry.field
    def all_services(self) -> List[ServiceType]:
        return Service.objects.select_related("category").all()

    @strawberry.field
    def all_orders(self) -> List[OrderType]:
        return Order.objects.prefetch_related("items__service__category").all()

    @strawberry.field
    def service_by_id(self, id: int) -> Optional[ServiceType]:
        return Service.objects.filter(pk=id).first()

    @strawberry.field
    def order_by_id(self, id: int) -> Optional[OrderType]:
        return Order.objects.filter(pk=id).first()


# Mutations
@strawberry.type
class Mutation:
    @strawberry.mutation
    def place_order(
        self,
        user_id: int,
        customer_email: str,
        customer_phone: str,
        customer_address: str,
        items: List[strawberry.ID],  # List of service IDs
        quantities: List[int],
    ) -> OrderType:
        user = User.objects.get(pk=user_id)
        order = Order.objects.create(
            customer=user,
            customer_email=customer_email,
            customer_phone=customer_phone,
            customer_address=customer_address,
        )
        for service_id, qty in zip(items, quantities):
            service = Service.objects.get(pk=service_id)
            OrderItem.objects.create(order=order, service=service, quantity=qty)
        return order


schema = strawberry.Schema(query=Query, mutation=Mutation)
