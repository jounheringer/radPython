from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE = "postgresql://postgres:1234@localhost:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE)

sessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()