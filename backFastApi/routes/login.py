from typing import Annotated
from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status

from Database import get_db
from models.Student import Student
from utils.Hash import Hasher

router = APIRouter(
    prefix="/login",
    tags=["login"],
)


@router.post('/')
async def login(user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: Session = Depends(get_db)):
    user = db.query(Student).filter(Student.name == user_credentials.username).first()
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account Not Verified"
        )
    access_token = Hasher.create_access_token(data={'user_id':user.id})
    return {
        "message": "User verified",
        "token": access_token
    }
