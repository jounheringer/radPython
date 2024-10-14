from typing import List
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from fastapi import APIRouter

import Schema
from Database import get_db
from models import Student as modelStudent, Courses
from models.Student import Student
from utils.Hash import Hasher

router = APIRouter(
    prefix='/alunos',
    tags=['alunos']
)

@router.get('/', response_model=List[Schema.CreateGetStudent])
def test_alunos(db: Session = Depends(get_db)):
    alunos = db.query(modelStudent.Student).all()
    return alunos


# @router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[Schema.CreatePostStudent])
# def test_posts_sent(post_post: Schema.CreatePostStudent, db: Session = Depends(get_db)):
#     aux_student = post_post.model_dump()
#     aux_student['date_created'] = datetime.now()
#     aux_student['date_updated'] = datetime.now()
#     aux_student['userpassword'] = "aluno123"
#     new_post = modelStudent.Student(**aux_student)
#     db.add(new_post)
#     db.commit()
#     db.refresh(new_post)
#
#     return [new_post]


@router.get('/{student_id}', status_code=status.HTTP_200_OK)
def get_test_one_post(student_id: int, db: Session = Depends(get_db)):
    idv_post = db.query(modelStudent.Student).filter(modelStudent.Student.id == student_id).first()
    subjects = db.query(Courses.Courses).filter(Courses.Courses.id_user == student_id).all()

    if idv_post is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"The id: {id} you requested for does not exist")
    return {
        "student": idv_post,
        "subjects": subjects
    }


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_test_post(id: int, db: Session = Depends(get_db)):
    deleted_post = db.query(modelStudent.Student).filter(modelStudent.Student.id == id)

    if deleted_post.first() is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"The id: {id} you requested for does not exist")
    deleted_post.delete(synchronize_session=False)
    db.commit()


@router.put('/first/{id_user}', status_code=status.HTTP_200_OK)
def update_test_post(update_post: Schema.LoginBase, id_user: int, db: Session = Depends(get_db)):
    updated_post = db.query(Student).filter(Student.id == id_user)

    if updated_post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The id:{id_user} does not exist")
    aux_post = update_post.model_dump()
    aux_post['userpassword'] = Hasher.get_password_hash(aux_post['userpassword'])
    aux_post['first_login'] = False
    updated_post.update(aux_post, synchronize_session=False)
    db.commit()

    return status.HTTP_200_OK
