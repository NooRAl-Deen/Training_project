from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
ma = Marshmallow()
jwt_manager = JWTManager()


def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {
    "origins": "http://127.0.0.1:5173",
    "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
    "supports_credentials": True
}})

    app.config['SECRET_KEY'] = 'SOMETEXT'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:noor12@localhost/flask_db'
    app.config['JWT_IDENTITY_CLAIM'] = 'user_id'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=2)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=2)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    ma.init_app(app)
    jwt_manager.init_app(app)
    

    # Import Blueprints
    from app.blueprints.main.routes import main
    from app.blueprints.auth.routes.routes import auth
    from app.blueprints.auth.routes.api_routes import auth_api
    from app.blueprints.post.routes.api_routes import post_api
    from app.blueprints.user.routes.api_routes import user_api
    from app.blueprints.errors.errors import errors, create_error_handlers

    # Register Blueprints
    app.register_blueprint(main)
    app.register_blueprint(auth)
    app.register_blueprint(auth_api)
    app.register_blueprint(user_api)
    app.register_blueprint(post_api)
    app.register_blueprint(errors)
    create_error_handlers(app)

    # Import Models
    from app.blueprints.auth.models.user import User
    from app.blueprints.auth.models.token_block_list import TokenBlockList
    from app.blueprints.post.models.post import Post
    return app