from flask import Blueprint, render_template

errors = Blueprint('errors', __name__, template_folder='templates')

def create_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('errors/404.html'), 404
    
    @app.errorhandler(401)
    def unauthorized_error(error):
        return render_template('errors/401.html'), 401

    @app.errorhandler(500)
    def internal_error(error):
        return render_template('errors/500.html'), 500