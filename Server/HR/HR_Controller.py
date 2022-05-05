from motor.motor_asyncio import AsyncIOMotorClient
from passlib.hash import bcrypt
from starlette import status
from starlette.responses import JSONResponse
from Configs.Config import MONGODB_HR_COLLECTIONS, MONGODB_DB_NAME, MONGODB_URL
from HR.HR_Model import HRData,login

async def hrSignUp(user: HRData):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_HR_COLLECTIONS)
    row = await collection.find_one({"hrPhone": user.hrPhone})
    if row:
        return {"Response": "User Already Exists"}
    else:
        usr = {'hrName': user.hrName, 'hrEmail': user.hrEmail,'hrPhone':user.hrPhone, 'imageString': user.imageString,
               'password': bcrypt.hash(user.password)}

        dbuser = HRData(**usr)
        collection.insert_one(dbuser.dict())
    return {"Response": "User Created Succesfully"}


async def hrLogin(creds: login):
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client.get_database(MONGODB_DB_NAME)
    collection = db.get_collection(MONGODB_HR_COLLECTIONS)
    row = await collection.find_one({"hrPhone": creds.hrPhone})
    if row:
        mpassword = row['password']
        if bcrypt.verify(creds.password, mpassword):
            return {'Status': 'True'}
        else:
            return {'Status':"False"}
    return {'Status':"False"}