from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session
from models import Artist, ArtistDB
from db import get_db, engine, Base
from typing import List
import os
import logging

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

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/api/artists", response_model=List[Artist])
async def get_artists(db: Session = Depends(get_db)):
    artists = db.query(ArtistDB).all()
    return [Artist.from_orm(artist) for artist in artists]

@app.get("/api/preview/{artist_id}")
async def get_preview(artist_id: int):
    db = next(get_db())
    artist = db.query(ArtistDB).filter(ArtistDB.id == artist_id).first()
    if not artist:
        logger.error(f"Artist not found: {artist_id}")
        raise HTTPException(status_code=404, detail="Artist not found")

    preview_path = "previews/hagehage.mp3"  # Fixed filename
    
    try:
        # Check if file exists locally
        if not os.path.isfile(preview_path):
            logger.error(f"Audio file not found locally: {preview_path}")
            raise HTTPException(
                status_code=404, 
                detail="Audio file 'hagehage.mp3' not found. Please upload the audio file first."
            )
            
        file_size = os.path.getsize(preview_path)
        if file_size == 0:
            logger.error(f"Empty audio file: {preview_path}")
            raise HTTPException(status_code=400, detail="Audio file is empty")
            
        logger.info(f"Serving local audio file: {preview_path}, size: {file_size}")
        return FileResponse(
            preview_path,
            media_type="audio/mpeg",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": str(file_size),
                "Cache-Control": "no-cache"  # Disabled caching for development
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error accessing audio file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error accessing audio file: {str(e)}")

@app.post("/api/upload/{artist_id}")
async def upload_preview(artist_id: int, file: UploadFile = File(...)):
    try:
        # Ensure the previews directory exists
        os.makedirs("previews", exist_ok=True)
        
        # Validate file type
        if not file.content_type.startswith("audio/"):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Create file path with fixed filename
        file_path = "previews/hagehage.mp3"
        
        # Save the file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        return JSONResponse(content={"message": "File uploaded successfully"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))