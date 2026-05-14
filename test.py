import requests

TOKEN = "cambiar"

headers = {
    "Authorization": f"Bearer {TOKEN}"
}

response = requests.get(
    "http://localhost:8000/me",
    headers=headers
)

print(response.status_code)
print(response.json())