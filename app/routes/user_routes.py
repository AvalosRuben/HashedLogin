from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.db import get_session
from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserResponse

router = APIRouter()

@router.post(
    "/users",
    response_model=UserResponse
)
def create_user(
    user_data:UserCreate,
    session: Session = Depends(get_session)
):
    statement = select(User).where(
        User.username == user_data.username
    )

    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El nombre de usuario ya está en"
        )

    new_user = User(
        name=user_data.name,
        username=user_data.username,

        #Cambiar cuando tengamos la contraseña hasheada
        hashed_password=user_data.password
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user
