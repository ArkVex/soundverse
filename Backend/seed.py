from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base
from models import ArtistDB

# Create tables
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    # Clear existing data
    db.query(ArtistDB).delete()
    
    
    
    for artist_data in artists:
        artist = ArtistDB(**artist_data)
        db.add(artist)
    
    try:
        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
