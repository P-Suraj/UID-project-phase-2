# This script uses Selenium to download images from Unsplash for each service in your dataset.
# Requirements: pip install selenium pandas webdriver-manager requests

import time
import os
import pandas as pd
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote
from pathlib import Path
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Paths
BASE_DIR = Path(__file__).parent.parent.parent  # backend/
DATASET_PATH = BASE_DIR / ".." / "dataset.csv"
IMAGES_DIR = BASE_DIR.parent / "frontend/images/services/"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Unsplash search URL
UNSPLASH_SEARCH_URL = "https://unsplash.com/s/photos/{}"

# Read dataset
services = pd.read_csv(DATASET_PATH)

# Set up Selenium Chrome driver (headless)
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def download_image(img_url, save_path):
    try:
        response = requests.get(img_url, timeout=15)
        if response.status_code == 200 and response.headers['Content-Type'].startswith('image/'):
            with open(save_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")
    return False

for idx, row in services.iterrows():
    service_name = row['service']
    category = row['category']
    query = f"{service_name} {category}".replace("&", "and")
    search_url = UNSPLASH_SEARCH_URL.format(quote(query))
    driver.get(search_url)
    try:
        # Wait for at least one image to be present
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img[src^="https://images.unsplash.com/"]'))
        )
        # Find the first Unsplash image in the results
        img_elem = driver.find_element(By.CSS_SELECTOR, 'img[src^="https://images.unsplash.com/"]')
        img_url = img_elem.get_attribute('src')
        if not img_url:
            print(f"No image found for {service_name}")
            continue
        # Determine extension
        ext = os.path.splitext(img_url)[1].split('?')[0]
        if ext.lower() not in ['.jpg', '.jpeg', '.png', '.webp']:
            ext = '.jpg'
        img_filename = f"{service_name.lower().replace(' ', '_').replace('&','and')}_{category.lower()}{ext}"
        img_path = IMAGES_DIR / img_filename
        if download_image(img_url, img_path):
            print(f"Downloaded: {img_filename}")
        else:
            print(f"Failed to download image for {service_name}")
    except Exception as e:
        print(f"Error for {service_name}: {e}")
    time.sleep(2)  # Be polite to Unsplash

driver.quit()
print("Done!")
