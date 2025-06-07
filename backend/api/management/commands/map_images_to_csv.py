import pandas as pd
from pathlib import Path
import os

# Paths
DATASET_PATH = Path(__file__).parent / "dataset.csv"
IMAGES_DIR = (Path(__file__).parent / "images/services/").resolve()
OUTPUT_PATH = Path(__file__).parent / "dataset_with_local_images.csv"

if not IMAGES_DIR.exists():
    print(f"IMAGES_DIR does not exist: {IMAGES_DIR}")
    exit(1)

# Read dataset
services = pd.read_csv(DATASET_PATH)

# DEBUG: List all files in IMAGES_DIR
print('Files in IMAGES_DIR:')
all_files = [f.name for f in IMAGES_DIR.iterdir() if f.is_file()]
for fname in all_files:
    print(fname)

# Helper to generate expected image filename

def get_image_filename(service, category):
    # Normalize service and category to match file naming
    def normalize(s):
        return (
            s.lower()
            .replace(' ', '_')
            .replace('&', 'and')
            .replace("'", "")
            .replace('-', '_')
            .replace('.', '')
            .replace('(', '')
            .replace(')', '')
            .replace('+', 'plus')
            .replace('/', '_')
        )
    name = f"{normalize(service)}_{normalize(category)}"
    # Try all common extensions (case-insensitive match)
    files = {f.lower(): f for f in all_files}
    print(f"DEBUG: Looking for {name} with extensions in {list(files.keys())}")
    for ext in ['.jpg', '.jpeg', '.png', '.webp']:
        candidate = name + ext
        candidate_lower = candidate.lower()
        if candidate_lower in files:
            print(f"FOUND: {files[candidate_lower]}")
            return f"images/services/{files[candidate_lower]}"
        print(f"Trying: {candidate} Exists: {candidate_lower in files}")  # Debug
    return ''  # Not found

# Update image_url for each row
for idx, row in services.iterrows():
    service = row['service']
    category = row['category']
    local_img = get_image_filename(service, category)
    print(f"Checking: {service}, {category} => {local_img}")
    if local_img:
        services.at[idx, 'image_url'] = local_img
    else:
        services.at[idx, 'image_url'] = 'not found'
    # else keep the original URL

services.to_csv(OUTPUT_PATH, index=False)
print(f"Updated CSV written to {OUTPUT_PATH}")
