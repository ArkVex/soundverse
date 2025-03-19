from pydantic import BaseModel
from typing import List

class Artist(BaseModel):
    id: int
    name: str
    description: str
    image: str
    genres: List[str]
    tags: List[str]
    button: str = "SUBSCRIBE TO GENERATE"
