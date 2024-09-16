from database import base
from sqlalchemy import Column, Integer, String


class Student(base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    serie = Column(String, nullable=False)