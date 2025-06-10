import strawberry
from typing import List, Optional
from .models import Service, Category, Order, OrderItem, CustomUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

@strawberry.type
class UserType:
	id: int
	username: str
	email: str
	
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
class AuthPayload:
	user: UserType
	token: Optional[str] = None
	refreshToken: Optional[str] = None

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

	@strawberry.field
	def get_user_by_email(self, email: str) -> Optional[UserType]:
		return CustomUser.objects.filter(email=email).first()

	@strawberry.field
	def get_current_user(self, info: strawberry.Info) -> Optional[UserType]:
		if not info.context.request.user.is_authenticated:
			return None
		return info.context.request.user


@strawberry.type
class Mutation:
	@strawberry.mutation
	def place_order(
		self,
		user_id: strawberry.ID,
		customer_email: str,
		customer_phone: str,
		customer_address: str,
		items: List[strawberry.ID],
		quantities: List[int],
	) -> OrderType:
		user = CustomUser.objects.get(pk=int(user_id))
		order = Order.objects.create(
			customer=user,
			customer_email=customer_email,
			customer_phone=customer_phone,
			customer_address=customer_address,
		)
		for service_id, qty in zip(items, quantities):
			service = Service.objects.get(pk=int(service_id))
			OrderItem.objects.create(order=order, service=service, quantity=qty)
		return order

	@strawberry.mutation
	def register(self, username: str, email: str, password: str) -> AuthPayload:
		try:
			user = CustomUser.objects.create_user(username=username, email=email, password=password)
			access_token = AccessToken.for_user(user)
			refresh_token = RefreshToken.for_user(user)
			return AuthPayload(user=user, token=str(access_token), refreshToken=str(refresh_token))
		
		except Exception as e:
			raise Exception(f"Registration failed: {e}")

	@strawberry.mutation
	def login(self, email: str, password: str) -> AuthPayload:
		user = authenticate(username=email, password=password)

		if user is None:
			raise Exception("Invalid credentials")

		access_token = AccessToken.for_user(user)
		refresh_token = RefreshToken.for_user(user)

		return AuthPayload(user=user, token=str(access_token), refreshToken=str(refresh_token))


schema = strawberry.Schema(query=Query, mutation=Mutation)