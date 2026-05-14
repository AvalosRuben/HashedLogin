from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
import jwt

from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

password_hash = PasswordHash.recommended()

# Dummy hash 
DUMMY_HASH = password_hash.hash("bolitasdemar")

# Hash con Argon2
def hash_password(password: str) -> str:
    return password_hash.hash(password)

# Verificar contraseña
def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)

# Crear token de acceso con JWT
def create_access_token(data: dict) -> str:
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

