from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from starlette.requests import Request
from starlette.status import HTTP_201_CREATED

import Schema
from Database import get_db
from models.Courses import Courses

router = APIRouter(
    prefix="/subject",
    tags=["subject"],
)


@router.post('/', status_code=status.HTTP_201_CREATED)
async def register(request: Request, subject: Schema.BaseSubject, db: Session = Depends(get_db)):
    subject_check = db.query(Courses).filter(Courses.subject_name == subject.subject_name, Courses.id_user == subject.id_user).first()
    if subject_check is not None:
        raise HTTPException(
            detail='Nome de usuario ja existe',
            status_code=status.HTTP_409_CONFLICT
        )
    new_subject = Courses(
        id_user=subject.id_user,
        subject_name=subject.subject_name,
        grade1=0,
        grade2=0,
        grade3=0,
        final_grade=0,
    )
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    return HTTP_201_CREATED

@router.put("/{subject_id}", status_code=status.HTTP_200_OK)
async def update(subject: Schema.Subjects, subject_id: int, db: Session = Depends(get_db)):
    updated_subject = db.query(Courses).filter(Courses.id == subject_id)

    if updated_subject.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='The subject does not exist')

    updated_subject.update(subject.model_dump(), synchronize_session=False)

    db.commit()

    return status.HTTP_200_OK
