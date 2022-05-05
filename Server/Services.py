import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from HR import HR_Controller, HR_Model
from Employee import EMP_Controller, EMP_Model

app = FastAPI(title='STAFF Portal', description='PROJECT')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# HR Methods
@app.post("/login", tags=["HR"], summary="Login", description=" Verifying User Credentials")
async def login(creds: HR_Model.login):
    return await HR_Controller.hrLogin(creds=creds)

@app.post("/signUp", tags=["HR"], summary="New HR", description="Creating a New HR")
async def signUp(user: HR_Model.HRData):
    return await HR_Controller.hrSignUp(user=user)

# Employee Methods
@app.post("/createEmployee", tags=["Employee"], summary="Adding new Employee", description=" Addding New Employee to DataBase")
async def createEmployee(emp: EMP_Model.EmpData):
    return await EMP_Controller.empAddEmployee(user=emp)

@app.put("/updateEmployee", tags=["Employee"], summary="Updating Employee", description=" Updating Employee Data in the Database")
async def updateEmployee(emp: EMP_Model.EmpData):
    return await EMP_Controller.empUpdateEmployee(user=emp)

@app.delete("/deleteEmployee", tags=["Employee"], summary="Deleting Employee", description=" Deleting Employee from Database")
async def deleteApp(empEmail: str):
    return await EMP_Controller.empDeleteEmployee(empEmail=empEmail)

@app.get("/getEmployee",  tags=["Employee"], summary="Get Employee Data", description=" Addding All Employee Data from the DataBase")
async def getEmployee(hrID: str):
    return await EMP_Controller.empGetEmployee(hrID=hrID)

if __name__ == "__main__":
    uvicorn.run(app)