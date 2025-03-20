from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import Artist, ArtistDB
from db import get_db, engine, Base
from typing import List

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.get("/api/artists", response_model=List[Artist])
async def get_artists(db: Session = Depends(get_db)):
    artists = db.query(ArtistDB).all()
    return [Artist.from_orm(artist) for artist in artists]