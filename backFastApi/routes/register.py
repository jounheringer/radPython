from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from starlette.requests import Request

import Schema
from Database import get_db
from models.Courses import Courses
from models.Student import Student
from utils.Hash import Hasher

router = APIRouter(
    prefix="/register",
    tags=["register"],
)


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=Schema.RegistrationUserRepsonse)
async def register(request: Request, user_credentials: Schema.CreatePostStudent, db: Session = Depends(get_db)):
    email_check = db.query(Student).filter(Student.username == user_credentials.username).first()
    if email_check is not None:
        raise HTTPException(
            detail='Nome de usuario ja existe',
            status_code=status.HTTP_409_CONFLICT
        )
    hashed_password = Hasher.get_password_hash(user_credentials.userpassword)
    user_credentials.userpassword = hashed_password
    new_user = Student(name=user_credentials.name,
                       email=user_credentials.email,
                       serie=user_credentials.serie,
                       userpassword=user_credentials.userpassword,
                       username=user_credentials.username,
                       approved=False,
                       first_login=True,
                       date_created=datetime.now(),
                       date_updated=datetime.now())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "User registration successful",
        "data": new_user
    }
