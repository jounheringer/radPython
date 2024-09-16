from typing import List
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from models import student as ModelStudent
import Schema
from fastapi import APIRouter
from database import get_db

router = APIRouter(
    prefix='/alunos',
    tags=['alunos']
)

@router.get('/', response_model=List[Schema.CreatePost])
def test_alunos(db: Session = Depends(get_db)):

    alunos = db.query(ModelStudent.Student).all()


    return  alunos

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[Schema.CreatePost])
def test_posts_sent(post_post:Schema.CreatePost, db:Session = Depends(get_db)):

    new_post = ModelStudent.Student(**post_post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return [new_post]


@router.get('/{id}', response_model=Schema.CreatePost, status_code=status.HTTP_200_OK)
def get_test_one_post(id:int ,db:Session = Depends(get_db)):

    idv_post = db.query(ModelStudent.Student).filter(ModelStudent.Student.id == id).first()

    if idv_post is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"The id: {id} you requested for does not exist")
    return idv_post

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_test_post(id:int, db:Session = Depends(get_db)):

    deleted_post = db.query(ModelStudent.Student).filter(ModelStudent.Student.id == id)


    if deleted_post.first() is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"The id: {id} you requested for does not exist")
    deleted_post.delete(synchronize_session=False)
    db.commit()



@router.put('/posts/{id}', response_model=Schema.CreatePost)
def update_test_post(update_post:Schema.PostBase, id:int, db:Session = Depends(get_db)):

    updated_post =  db.query(ModelStudent.Post).filter(ModelStudent.Post.id == id)

    if updated_post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The id:{id} does not exist")
    updated_post.update(update_post.dict(), synchronize_session=False)
    db.commit()


    return  updated_post.first()