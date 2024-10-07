from datetime import datetime

from pydantic import BaseModel

class GetStudentBase(BaseModel):
    id: int
    name: str
    serie: int
    email: str
    approved: bool
    date_created: datetime
    date_updated: datetime

    class Config:
        from_attributes = True

class CreateGetStudent(GetStudentBase):
    class Config:
        from_attributes=True

class PostStudentBase(BaseModel):
    name: str
    serie: int
    email: str
    approved: bool

    class Config:
        from_attributes = True

class CreatePostStudent(PostStudentBase):
    class Config:
        from_attributes=True

