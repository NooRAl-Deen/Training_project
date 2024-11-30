from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    JWT_IDENTITY_CLAIM = os.getenv('JWT_IDENTITY_CLAIM')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES')))
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_TOKEN_LOCATION = os.getenv('JWT_TOKEN_LOCATION')
    JWT_ACCESS_COOKIE_PATH=os.getenv('JWT_ACCESS_COOKIE_PATH')
    JWT_REFRESH_COOKIE_PATH= os.getenv('JWT_REFRESH_COOKIE_PATH')
    JWT_COOKIE_SECURE= bool(os.getenv('JWT_COOKIE_SECURE', False))
    JWT_COOKIE_SAMESITE= os.getenv('JWT_COOKIE_SAMESITE')
    JWT_COOKIE_CSRF_PROTECT= bool(os.getenv('JWT_COOKIE_CSRF_PROTECT'))