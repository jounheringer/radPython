from datetime import datetime
from typing import List

from pydantic import BaseModel, EmailStr


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
    userpassword: str
    username: str
    serie: int
    email: str
    approved: bool

    class Config:
        from_attributes = True

class CreatePostStudent(PostStudentBase):
    class Config:
        from_attributes=True

class LoginBase(BaseModel):
    username: str
    userpassword: str

    class Config:
        from_attributes=True

class CreateLogin(LoginBase):
    class Config:
        from_attributes=True

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    date_created: datetime

    class Config:
        from_attributes = True

class RegistrationUserRepsonse(BaseModel):
    message:str
    data: UserResponse

class TokenResponse(BaseModel):
    message: str
    token: str

class BaseSubject(BaseModel):
    subject_name: str
    id_user: int

class RegistrationSubject(BaseModel):
    message:str
    data: BaseSubject

class Subjects(BaseModel):
    id: int
    subject_name: str
    grade1: float
    grade2: float
    grade3: float
    final_grade: float
    class Config:
        from_attributes = True

class StudentWithSubjects(BaseModel):
    student: GetStudentBase
    subjects: List[Subjects] = []

