
# 🛠️ Backend Setup Guide (with Poetry)

> **📁 Note:** All the following steps should be run inside the `/backend` directory of the project.

## ✅ Prerequisites

- Python 3.11+ installed

---

## 📄 Environment Setup

We use environment variables to manage secrets securely.

1. Duplicate the example file:
    ```bash
    cp .env.example .env
    ```

2. Open `.env` and update values like `SECRET_KEY`, `DEBUG`, and `DATABASE_URL`.

> ⚠️ Never commit your `.env` file. It's already listed in `.gitignore`.

## 📦 Step 1: Install Poetry

Run this command in your terminal:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

After install:

> 🔁 Restart your terminal.



> ✅ Instead of using `pip` or `pipx`, we use **Poetry** because it offers better dependency management, built-in virtual environments, and reproducible installs via `poetry.lock`.

Check if Poetry is installed:

```bash
poetry --version
```

---


## 🧪 Step 3: Install Dependencies

Poetry will automatically create a virtual environment and install everything:

```bash
poetry install
```

---

## 🧬 Step 4: Activate the Virtual Environment

### Option 1 (Preferred):

Go to `/backend` folder

```bash
source .venv/bin/activate
```

### Option 2 (Optional):
If you'd rather use `poetry shell` like older versions, install the plugin:
```bash
poetry self add poetry-plugin-shell
poetry shell
```

---

## 🛠️ Step 5: Run Django Commands

After activation, you can run commands like:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

```bash
# Create a Django superuser (admin)
python manage.py createsuperuser
```

After creating the superuser, open your browser and go to [http://localhost:8000/admin](http://localhost:8000/admin) to log in to the Django admin panel.

---

## ✅ Optional: Add Dependencies Later

To install a new package:

```bash
poetry add <package-name>
```

For dev-only packages:
(packages only developers use  --not in production)

```bash
poetry add --dev <package-name>
```

---

## ❌ To Exit the Virtual Environment

```bash
deactivate
```

---

## 🔁 Troubleshooting

- If `poetry install` fails, try running `poetry env use python3` first.
- If you get permission errors, run with `python3` instead of `python`.