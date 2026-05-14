from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

# Dummy hash 
DUMMY_HASH = password_hash.hash("bolitasdemar")

# Hash con Argon2
def hash_password(password: str) -> str:
    return password_hash.hash(password)

# Verificar contraseña
def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)