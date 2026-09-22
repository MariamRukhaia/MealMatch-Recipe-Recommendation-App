from flask import Flask, request, render_template, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text
from datetime import datetime 
from flask_cors import CORS
from sqlalchemy import text
import bcrypt

app = Flask(__name__)
API_KEY = "b00ad537e8ee44d696dd0450de9a8a68" 
MAIN_URL = "https://api.spoonacular.com/recipes/complexSearch"
CORS(app)
app.secret_key = "123"  

# Setting up database
db_cred = {
    'user': 'root',
    'pass': '',
    'host': 'localhost',
    'name': 'food'
}

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://\
{db_cred['user']}:{db_cred['pass']}@{db_cred['host']}/\
{db_cred['name']}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
connection = engine.connect()


# Welcome Page
@app.route('/')
def welcome():
    return render_template('welcome.html')

# Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Get user from the database
    with db.engine.connect().execution_options(autocommit=True) as connection: # To get updated data from database
        query = text("SELECT * FROM User WHERE username = :username")
        result = connection.execute(query, {'username': username}).fetchone()

    if not result:
        flash('Invalid username or password', 'error')
        return redirect(url_for('welcome'))

    hashed_password = result[4]
    # Password checking
    try:
        if result[4] == password: 
            flash(f'Welcome back, {username}!', 'success')
            session['user_id'] = result[0]
            session['username'] = result[1]
         
            return render_template('cuisine.html')
        elif bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            flash(f'Welcome back, {username}!', 'success')
            session['user_id'] = result[0]
            session['username'] = result[1]
            
            return render_template('cuisine.html')
        else:
            flash('Invalid username or password', 'error')
            return redirect(url_for('welcome'))
    except:
        flash('Invalid username or password', 'error')
        return redirect(url_for('welcome'))

# Register Page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        full_name = request.form['fullname']
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        session['full_name'] = full_name
        session['email'] = email
        session['username'] = username
        session['password'] = password

        return redirect(url_for('dietary_preferences'))
    
    return render_template('register.html')

# Dietary Page
@app.route('/dietary_preferences', methods=['GET', 'POST'])
def dietary_preferences():
    if request.method == 'POST':
        dietary_restrictions = request.form.get('dietary_restrictions', '')
        diet = request.form.get('diet', '')
        allergies = request.form.get('allergies', '')
       

        session['dietary_restrictions'] = dietary_restrictions
        session['diet'] = diet
        session['allergies'] = allergies
        username = session.get('username')
        password = session.get('password')
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            with db.engine.connect() as connection:
                transaction = connection.begin()

                check_query = text("""SELECT * FROM User WHERE Username = :username OR Email = :email""")
                result = connection.execute(check_query, {'username': username, 'email': session['email']}).fetchone()

                if result:
                    flash('Username or Email already exists', 'error')
                    transaction.rollback()
                    return redirect(url_for('welcome'))

                sign_up_query = text(""" CALL signUp(:full_name, :email, :username, :password, :dietary_restrictions, :diet, :allergies)""")
                connection.execute(sign_up_query, {
                    'full_name': session['full_name'],
                    'email': session['email'],
                    'username': username,
                    'password': hashed_password,
                    'dietary_restrictions': dietary_restrictions,
                    'diet': diet,
                    'allergies': allergies
                    
                })
                
                transaction.commit()
                flash('User registered successfully!', 'success')
                session.clear()

                return redirect(url_for('welcome'))
        except Exception as e:
            transaction.rollback()
            flash(f'An error occurred while registering: {e}', 'error')
            return redirect(url_for('welcome'))

        
    return render_template('dietary_preferences.html')
