from database import base
from sqlalchemy import Column, Integer, String, TIMESTAMP


class Student(base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    serie = Column(String, nullable=False)
    date_created = Column(TIMESTAMP, nullable=False)
    date_updated = Column(TIMESTAMP, nullable=False)