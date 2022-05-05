import json
import datetime
from Employee.EMP_Model import EmpData
from bson import json_util
from motor.motor_asyncio import AsyncIOMotorClient
from Configs.Config import MONGODB_EMP_COLLECTIONS, MONGODB_DB_NAME, MONGODB_URL

async def empAddEmployee(user: EmpData):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_EMP_COLLECTIONS)
    row = await collection.find_one({"empEmail": user.empEmail})
    print(user)
    if row:
        return {"Response": "Employee Already Exists"}
    else:
        usr = {'empName': user.empName, 'empEmail': user.empEmail,'empPhone':user.empPhone, 'hrID': user.hrID, 'empSal':user.empSal}
        dbuser = EmpData(**usr)
        collection.insert_one(dbuser.dict())
    return {"Response": "Employee Added Succesfully"}


async def empUpdateEmployee(user: EmpData):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_EMP_COLLECTIONS)
    row = await collection.find_one({"empEmail": user.empEmail})
    if row:
        await collection.update_one({"empEmail": user.empEmail},
                                    {'$set': {'empName': user.empName,'empPhone':user.empPhone,'empSal':user.empSal, 'updatedTime': datetime.datetime.utcnow()}})
        return {"Response": "Employee Updated"}
    else:
        return {"Response": "No Such Employee Exists"}


async def empDeleteEmployee(empEmail:str):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_EMP_COLLECTIONS)
    row = await collection.find_one({"empEmail": empEmail})
    if row:
        data = EmpData(**row)
        await collection.delete_one(data.dict())
        return {"message": "Employee Deleted Succesfully"}
    else:
        return {"message": "Employee Does Not Exists"}


async def empGetEmployee(hrID: str):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_EMP_COLLECTIONS)
    row = collection.find({'hrID': hrID})
    x = []
    if row:
        async for item in row:
            x.append(item)
        return json.loads(json_util.dumps(x))
