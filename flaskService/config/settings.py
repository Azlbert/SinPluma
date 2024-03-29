from datetime import timedelta

ACCESS_EXPIRES = timedelta(minutes=15)
REFRESH_EXPIRES = timedelta(days=30)

DEBUG   = True
PROPAGATE_EXCEPTIONS = True

JWT_ACCESS_TOKEN_EXPIRES = ACCESS_EXPIRES
JWT_REFRESH_TOKEN_EXPIRES = REFRESH_EXPIRES
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@inno_router:6446/SinPluma?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
REDIS_URL = "redis://:@redis:6379/0"
MINIO_ENDPOINT="minio:9000"
MINIO_SECURE=False
MINIO_ACCESS_KEY="minio"
MINIO_SECRET_KEY="minio123"