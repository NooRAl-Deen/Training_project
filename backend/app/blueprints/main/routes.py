from flask import Blueprint, render_template

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def index():
    return render_template('main/index.html')


@main.route('/about')
def about():
    return render_template('main/about.html')