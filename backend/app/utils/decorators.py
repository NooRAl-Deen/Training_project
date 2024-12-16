from functools import wraps
from flask import redirect, url_for, make_response
from flask_login import current_user
from flask_jwt_extended import get_current_user


def anonymous_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated:
            return redirect(url_for('auth.profile'))
        return f(*args, **kwargs)
    return decorated_function

def auth_role(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user = get_current_user()
            roles = role if isinstance(role, list) else [role]
            if all(not user.has_role(r) for r in roles):
                return make_response({"msg": f"Missing any of roles {','.join(roles)}"}, 403)
            return fn(*args, **kwargs)
        return decorator
    return wrapper