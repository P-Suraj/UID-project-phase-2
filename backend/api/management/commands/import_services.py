import csv
from django.core.management.base import BaseCommand
from api.models import Category, Service
from pathlib import Path

class Command(BaseCommand):
    help = "Import services from dataset.csv"

    def handle(self, *args, **kwargs):
        dataset_path = Path(__file__).resolve().parent.parent.parent.parent / "dataset.csv"
        with open(dataset_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                category_name = row['category'].strip()
                service_name = row['service'].strip()
                description = row['description'].strip()
                image_url = row['image_url'].strip()
                price = row['price'].strip()

                # Get or create the category
                category, _ = Category.objects.get_or_create(name=category_name)

                # Create the service
                Service.objects.create(
                    category=category,
                    name=service_name,
                    description=description,
                    image_url=image_url,
                    price=price if price else None
                )
        self.stdout.write(self.style.SUCCESS('Services imported successfully!'))