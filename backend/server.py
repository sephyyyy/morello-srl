from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Endpoints
@api_router.post("/contact", response_model=dict)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Handle contact form submissions from the website"""
    try:
        # Create contact submission object
        submission = ContactSubmission(**contact_data.dict())
        
        # Insert into MongoDB
        result = await db.contact_submissions.insert_one(submission.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Grazie per il tuo messaggio! Ti contatteremo presto.",
                "submissionId": submission.id
            }
        else:
            return {
                "success": False,
                "message": "Errore nell'invio del messaggio. Riprova più tardi."
            }
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        return {
            "success": False,
            "message": "Errore interno del server. Riprova più tardi."
        }

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions (admin endpoint)"""
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        return []

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
