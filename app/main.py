from fastapi import FastAPI
from app.db import create_db_and_tables
from app.routes.user_routes import router as user_router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(user_router)

@app.get("/")
def root():
    return{
        "message":"Backend funcionando papu :v"
    }