from Database import base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean


class Student(base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    serie = Column(Integer, nullable=False)
    email = Column(String, nullable=False)
    approved = Column(Boolean, nullable=False)
    date_created = Column(TIMESTAMP, nullable=False)
    date_updated = Column(TIMESTAMP, nullable=False)