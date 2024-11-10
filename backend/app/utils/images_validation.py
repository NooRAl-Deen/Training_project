import uuid
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(filename):
    unique_id = uuid.uuid4().hex;
    _, extention = os.path.splitext(filename)
    return f"{unique_id}{extention}"