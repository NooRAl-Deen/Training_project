from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config


db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
ma = Marshmallow()
jwt_manager = JWTManager()


def create_app():

    app = Flask(__name__, static_folder="../static")
    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173"])

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    ma.init_app(app)
    jwt_manager.init_app(app)

    # Import Blueprints
    from app.blueprints.auth.views.api import auth_api
    from app.blueprints.post.views.api import post_api
    from app.blueprints.user.views.api import user_api
    from app.blueprints.profile.views.api import profile_api
    from app.blueprints.comment.views.api import comments_api
    from app.blueprints.like.views.api import likes_api
    from app.blueprints.timeline.views.api import timeline_api
    from app.blueprints.reply.views.api import replies_api
    from app.blueprints.friend_suggestions.views.api import friend_suggestions_api
    from app.blueprints.chat.views.conversation import conversation_api
    from app.blueprints.chat.views.message import message_api

    # Register Blueprints
    app.register_blueprint(auth_api)
    app.register_blueprint(user_api)
    app.register_blueprint(post_api)
    app.register_blueprint(profile_api)
    app.register_blueprint(comments_api)
    app.register_blueprint(likes_api)
    app.register_blueprint(timeline_api)
    app.register_blueprint(replies_api)
    app.register_blueprint(friend_suggestions_api)
    app.register_blueprint(conversation_api)
    app.register_blueprint(message_api)

    # Import Models
    from app.blueprints.auth.models.user import User
    from app.blueprints.auth.models.role import Role, UserRole
    from app.blueprints.auth.models.token_block_list import TokenBlockList
    from app.blueprints.post.models.post import Post
    from app.blueprints.comment.models.comment import Comment
    from app.blueprints.like.models.like import Like
    from app.blueprints.reply.models.reply import Reply
    from app.blueprints.chat.models.conversation import Conversation
    from app.blueprints.chat.models.message import Message

    return app
