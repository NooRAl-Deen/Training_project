from flask import Blueprint, render_template, redirect, url_for, flash
from app.blueprints.auth.forms.register import Register
from app.blueprints.auth.forms.login import Login
from ..models.user import User
from ....app import db
from flask_login import login_user, login_required, logout_user
from app.utils.decorators import anonymous_required

auth = Blueprint('auth', __name__, template_folder='../templates')

@auth.route('/register', methods=['GET', 'POST'])
@anonymous_required
def register():
    form = Register()
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        new_user = User(username=username, email=email, password_prop=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('main.about'))
    return render_template('auth/register.html', form=form)


@auth.route('/login', methods=['GET', 'POST'])
@anonymous_required
def login():
    form = Login()
    if form.validate_on_submit():
        inserted_user = User.query.filter_by(username=form.username.data).first()
        if inserted_user and inserted_user.check_inserted_password(inserted_password=form.password.data):
            login_user(inserted_user)
            return redirect(url_for('auth.profile'))
        else:
            flash('Wrong credentials, try again!')
    return render_template('auth/login.html', form=form)


@auth.route('/profile')
@login_required
def profile():
    return render_template('auth/profile.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))