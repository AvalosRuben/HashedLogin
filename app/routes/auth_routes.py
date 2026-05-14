from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from app.db import get_session
from app.models.user_model import User
from app.core.security import verify_password, create_access_token, DUMMY_HASH

router = APIRouter()

@router.post("/login")
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(
        select(User).where(User.username == form_data.username)
    ).first()

    # dummy hash siempre ejecuta
    if not user:
        verify_password(form_data.password, DUMMY_HASH)
        raise HTTPException(status_code=401, detail="Usuario o contraseña inválidos")

    # validar password real
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Usuario o contraseña inválidos")

    # crear token
    token = create_access_token({"sub": user.username})

    # cookie httpOnly
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=180,  # 3 minutos
        secure=False,  # en prod sería True
        samesite="lax"
    )

    return {"access_token": token, "token_type": "bearer"}