from sqlalchemy import Column, Integer, String, ARRAY
from pydantic import BaseModel
from typing import List, Optional
from db import Base

# SQLAlchemy model for database
class ArtistDB(Base):
    __tablename__ = "artists"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    image = Column(String)
    description = Column(String)
    tags = Column(ARRAY(String))
    genres = Column(ARRAY(String))
    button = Column(String)

# Pydantic model for API response
class Artist(BaseModel):
    id: int
    name: str
    image: str
    description: str
    tags: List[str]
    genres: List[str]
    button: str
    
    class Config:
        from_attributes = True 