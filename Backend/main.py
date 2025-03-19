from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Artist
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/artists", response_model=List[Artist])
async def get_artists():
    return [
        {
            "id": 1,
            "name": "ASH POURNOURI",
            "image": "/ash-pournouri.jpg",
            "description": "Music entrepreneur shaping EDM, pop, and artist careers",
            "tags": ["Producer • Manager • Entrepreneur"],
            "genres": ["Dance Pop"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 2,
            "name": "AVICII",
            "image": "/avicii.jpg",
            "description": "Iconic DJ blending melodic house with deep emotions",
            "tags": ["EDM • Melodic • Progressive"],
            "genres": ["Electronic", "House"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 3,
            "name": "COLDPLAY",
            "image": "/coldplay.jpg",
            "description": "Legendary rock band known for atmospheric anthems",
            "tags": ["Alternative • Stadium Rock • Experimental"],
            "genres": ["Alternative", "Rock", "Pop"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 4,
            "name": "IMAGINE DRAGONS",
            "image": "/imagine-dragons.jpg",
            "description": "Energetic rock band mixing alt-rock with electronics",
            "tags": ["Alternative • Epic • Crossover"],
            "genres": ["Alternative Rock", "Pop Rock", "Electronic Rock"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 5,
            "name": "SKRILLEX",
            "image": "/skrillex.jpg",
            "description": "Pioneer of modern bass music, blending dubstep, EDM, and genre-bending sounds",
            "tags": ["Bass • Innovation • Energy"],
            "genres": ["Dubstep", "Bass Music", "Electronic", "Future Bass"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 6,
            "name": "SWEDISH HOUSE MAFIA",
            "image": "/swedish-house-mafia.jpg",
            "description": "EDM supergroup known for anthemic festival hits and progressive house",
            "tags": ["Progressive • Festival • Euphoric"],
            "genres": ["EDM", "House", "Festival Anthems"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 7,
            "name": "THE WEEKND",
            "image": "/the-weeknd.jpg",
            "description": "Global icon blending R&B, pop, and dark synth-driven sound",
            "tags": ["R&B • Dark Pop • Cinematic"],
            "genres": ["R&B", "Synthpop", "Darkwave"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 8,
            "name": "MEMBA",
            "image": "/memba.jpg",
            "description": "Genre-bending duo crafting tribal rhythms, bass, and cinematic electronic beats",
            "tags": ["World • Bass • Experimental"],
            "genres": ["Electronic", "Bass", "Experimental Bass"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 9,
            "name": "GALANTIS",
            "image": "/galantis.jpg",
            "description": "Duo fusing pop melodies with uplifting electronic beats",
            "tags": ["Feel-Good • Dance • Pop"],
            "genres": ["Electronic", "Pop EDM", "Future Bass"],
            "button": "SUBSCRIBE TO GENERATE"
        },
        {
            "id": 10,
            "name": "ZARA LARSSON",
            "image": "/zara-larsson.jpg",
            "description": "Pop powerhouse delivering chart-topping hits with electronic flair",
            "tags": ["Pop • Vocal • Dance"],
            "genres": ["Pop", "Electronic"],
            "button": "SUBSCRIBE TO GENERATE"
        }
    ]
