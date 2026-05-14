from fastapi import FastAPI
from app.db import create_db_and_tables
from app.routes.user_routes import router as user_router
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(user_router)

@app.get("/")
def root():
    return{
        "message":"Backend funcionando papu :v"
    }

app.include_router(auth_router)