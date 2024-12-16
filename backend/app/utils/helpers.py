from datetime import datetime, timezone
from flask_jwt_extended import decode_token

from app.blueprints.auth.models.token_block_list import TokenBlockList
from app.app import db
from sqlalchemy.exc import NoResultFound

def add_token_to_database(encoded_token):
    decoded_token = decode_token(encoded_token)
    jti = decoded_token['jti']
    token_type = decoded_token['type']
    user_id = decoded_token['user_id']
    expires = datetime.fromtimestamp(decoded_token['exp'])

    token_block_list = TokenBlockList(
        jti=jti,
        token_type=token_type,
        user_id=user_id,
        expires = expires
    )

    db.session.add(token_block_list)
    db.session.commit()

def revoke_token(token_jti, user_id):
    try:
        token = TokenBlockList.query.filter_by(jti=token_jti, user_id=user_id).one()
        token.revoked_at = datetime.now(timezone.utc)
        db.session.commit()
    except NoResultFound:
        raise Exception(f'Could not find token {token_jti}')
    

def is_token_revoked(jwt_payload):
    jti = jwt_payload['jti']
    user_id = jwt_payload['user_id']
    try:
        token = TokenBlockList.query.filter_by(jti=jti, user_id=user_id).one()
        return token.revoked_at is not None
    except NoResultFound:
        raise Exception(f'Could not find token {jti}')
