from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy.orm import Session # type: ignore
from app.models.user import User
from app.core.database import get_db
from app.core.security import hash_password
from app.schemas.user_schema import UserCreate

router = APIRouter()

@router.post("/register")
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email đã được đăng ký")

    db_user = User(
        username=user_data.username,
        hashed_password=hash_password(user_data.password),
        name=user_data.name,
        number=user_data.number,
        address=user_data.address
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"msg": "Tạo tài khoản thành công"}
