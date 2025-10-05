from pydantic import BaseModel, EmailStr # type: ignore

class UserCreate(BaseModel):
    name: str
    number: str
    address: str
    email: EmailStr
    password: str
