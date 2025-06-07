import csv
import requests
import time
from pathlib import Path
from urllib.parse import quote

# You may need to install requests: pip install requests

UNSPLASH_SEARCH_URL = "https://source.unsplash.com/400x400/?{}"

# Path to your dataset (relative to backend/)
DATASET_PATH = Path("dataset.csv")
# Path to output CSV (relative to backend/)
OUTPUT_PATH = Path("dataset_with_images.csv")
# Path to download images (relative to backend/)
IMAGES_DIR = Path("../frontend/images/services/").resolve()
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

def fetch_image_url(service_name, category):
    # Use Unsplash search for a relevant image
    query = f"{service_name} {category}".replace("&", "and")
    return UNSPLASH_SEARCH_URL.format(quote(query))

def main():
    with open(DATASET_PATH, newline='', encoding='utf-8') as infile, \
         open(OUTPUT_PATH, 'w', newline='', encoding='utf-8') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in reader:
            service_name = row['service']
            category = row['category']
            # Fetch Unsplash image URL
            image_url = fetch_image_url(service_name, category)
            row['image_url'] = image_url
            writer.writerow(row)
            # Optionally, download the image locally
            try:
                response = requests.get(image_url, timeout=10)
                content_type = response.headers.get('Content-Type', '').lower()
                if response.status_code == 200 and content_type.startswith('image/'):
                    img_data = response.content
                    # Determine file extension from Content-Type
                    if 'jpeg' in content_type:
                        ext = '.jpg'
                    elif 'png' in content_type:
                        ext = '.png'
                    elif 'webp' in content_type:
                        ext = '.webp'
                    else:
                        ext = '.img'  # fallback
                    img_filename = f"{service_name.lower().replace(' ', '_').replace('&','and')}_{category.lower()}{ext}"
                    img_path = IMAGES_DIR / img_filename
                    with open(img_path, 'wb') as img_file:
                        img_file.write(img_data)
                else:
                    print(f"Skipped saving for {service_name}: Not a valid image (status: {response.status_code}, content-type: {content_type})")
                time.sleep(1)  # Add delay to avoid rate limiting
            except Exception as e:
                print(f"Failed to download image for {service_name}: {e}")
    print(f"Done! Updated CSV with image URLs at {OUTPUT_PATH}")
    print(f"Images downloaded to {IMAGES_DIR}")

if __name__ == "__main__":
    main()
