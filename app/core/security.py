from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import HTTPException, Request
from sqlmodel import Session, select
from app.models.user_model import User

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

def decode_access_token(token: str):
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    return payload

def get_current_user(request: Request, session: Session):
    token = request.cookies.get("access_token")

    if not token:
        auth = request.headers.get("Authorization")
        if not auth or not auth.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="No autenticado")

        token = auth.split(" ")[1]

    payload = decode_access_token(token)
    username = payload.get("sub")

    if not username:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = session.exec(
        select(User).where(User.username == username)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return user