from app.app import ma
from app.blueprints.auth.models.user import User
from app.blueprints.auth.schemas.user import UserSchema
from ..models.conversation import Conversation
from marshmallow import fields

class ConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True
        include_relationships = True
        include_fk = True
    
    conversation_members = fields.Method("get_other_members")

    def get_other_members(self, obj):
        current_user_id = self.context.get("user_id")  # Get user_id from context
        other_member_ids = [member_id for member_id in obj.members if member_id != current_user_id]

        # Fetch user details for other members
        other_members = User.query.filter(User.id.in_(other_member_ids)).all()

        # Serialize the users
        return [{"id": user.id,"username": user.username, "profile_pic": user.profile_pic} for user in other_members]