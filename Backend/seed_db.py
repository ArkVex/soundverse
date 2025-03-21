from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base
from models import ArtistDB

Base.metadata.create_all(bind=engine)



def seed_database():
    db = SessionLocal()
    try:
        existing_count = db.query(ArtistDB).count()
        if existing_count == 0:
            for artist_data in initial_artists:
                artist = ArtistDB(**artist_data)
                db.add(artist)
            db.commit()
            print("Database seeded successfully.")
        else:
            print("Database already contains data. Skipping seed.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()