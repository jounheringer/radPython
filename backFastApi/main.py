from fastapi import FastAPI

from routes import posts



app = FastAPI()

app.include_router(posts.router)

@app.get("/")
async def read_root():
    return{ "message": "Hello World" }