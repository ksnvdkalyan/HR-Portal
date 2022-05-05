from pydantic import BaseModel, Field
from datetime import datetime

class EmpData(BaseModel):
    empName:str
    empEmail:str
    hrID:str
    empPhone:str
    empSal:str
    createdTime: datetime = Field(default_factory=datetime.utcnow)
    updatedTime: datetime = Field(default_factory=datetime.utcnow)
    