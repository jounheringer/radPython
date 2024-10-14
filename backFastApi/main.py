from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import posts, login, register, subjects

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)
app.include_router(login.router)
app.include_router(register.router)
app.include_router(subjects.router)
