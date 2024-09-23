from pydantic import BaseModel

class PostBase(BaseModel):
    name: str
    serie: int

    class Config:
        from_attributes = True

class CreatePost(PostBase):
    class Config:
        from_attributes=True