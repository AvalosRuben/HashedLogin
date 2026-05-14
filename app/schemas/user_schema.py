from sqlmodel import SQLModel

class UserCreate(SQLModel):
    name:str
    username:str
    password: str

class UserResponse(SQLModel):
    id: int
    name: str
    username: str
    hashed_password: str