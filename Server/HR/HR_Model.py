from pydantic import BaseModel, Field
from datetime import datetime

class login(BaseModel):
    hrPhone:str
    password:str   
    

class HRData(login):
    hrName:str
    hrEmail:str
    imageString: str
    createdTime: datetime = Field(default_factory=datetime.utcnow)
    updatedTime: datetime = Field(default_factory=datetime.utcnow)
    