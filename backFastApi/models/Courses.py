from Database import base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, ForeignKey

from models.Student import Student


class Courses(base):
    __tablename__ = "materias"

    id = Column(Integer, primary_key=True, nullable=False)
    id_user = Column(Integer, ForeignKey(Student.id))
    subject_name = Column(String, nullable=False)
    grade1 = Column(Integer, nullable=True)
    grade2 = Column(Integer, nullable=True)
    grade3 = Column(Integer, nullable=True)
    final_grade = Column(Integer, nullable=True)