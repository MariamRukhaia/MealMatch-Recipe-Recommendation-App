from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import text
import bcrypt
from flask import make_response
from werkzeug.security import generate_password_hash
from bs4 import BeautifulSoup
import requests
import json
import random
from flask_cors import cross_origin

app = Flask(__name__)


app.config["SESSION_TYPE"] = "filesystem"  # Stores session data in files
app.config["SESSION_PERMANENT"] = True  # Session lasts even after closing browser
app.config["SESSION_USE_SIGNER"] = True  # Prevents tampering
app.config["SESSION_FILE_DIR"] = "./flask_session_data"  # Where session files are stored
app.config["SECRET_KEY"] = "your_secret_key"  # Needed for session security

Session(app)  


#CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
 
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)


#API_KEY = "8394049640304118aa0de623729ec68e" 
BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"
#CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
app.secret_key = '123'

# Database Setup
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

@app.route('/')
def home():
    return "Flask backend is running!"


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    with db.engine.connect().execution_options(autocommit=True) as connection:
        query = text("SELECT * FROM User WHERE username = :username")
        result = connection.execute(query, {'username': username}).fetchone()

    if not result:
        return jsonify({'error': 'Invalid username or password'}), 401

    hashed_password = result[4] 
    print("helloooo")

    # Check password
    if result[4] == password: 
            
            session['user_id'] = result[0]
            session['username'] = result[1]
            session.permanent = True
            session.modified = True
            print("Session set: ", session.get("user_id"))
            return jsonify({'message': f'Welcome back, {username}!', 'user': username}), 200

    elif bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
        session['user_id'] = result[0]
        session['username'] = result[1]
        session.permanent = True
        session.modified = True
        print("Session set: ", session.get("user_id"))
        return jsonify({'message': f'Welcome back, {username}!', 'user': username}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    full_name = data.get('full_name')  
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        with db.engine.connect() as connection:
            transaction = connection.begin()

            # Check if user exists
            check_query = text("""SELECT * FROM User WHERE Username = :username OR Email = :email""")
            result = connection.execute(check_query, {'username': username, 'email': email}).fetchone()

            if result:
                transaction.rollback()
                return jsonify({'error': 'Username or Email already exists'}), 400

            
            session['full_name'] = full_name
            session['email'] = email
            session['username'] = username
            session['password'] = hashed_password  

            
            sign_up_query = text(""" CALL signUp(:full_name, :email, :username, :password, '', '', '')""")
            connection.execute(sign_up_query, {
                'full_name': full_name,  
                'email': email,
                'username': username,
                'password': hashed_password,
            })

            transaction.commit()
            return jsonify({'message': 'User registered successfully! Proceed to onboarding.'}), 201

    except Exception as e:
        transaction.rollback()
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/api/onboarding', methods=['POST'])
def onboarding():
    data = request.json
    username = data.get('username') or session.get('username') 
    if not username:
        return jsonify({'error': 'No username provided. Please register again.'}), 400

    dietary_restrictions = data.get('dietary_restrictions', 'None')
    diet = data.get('diet', 'None')
    allergies = data.get('allergies', 'None')

    try:
        with db.engine.connect() as connection:
            transaction = connection.begin()

            update_user_query = text("""
                UPDATE User 
                SET dietary_restrictions = :dietary_restrictions, 
                    diet = :diet, 
                    allergies = :allergies 
                WHERE username = :username
            """)
            result = connection.execute(update_user_query, {
                'dietary_restrictions': dietary_restrictions,
                'diet': diet,
                'allergies': allergies,
                'username': username
            })

            transaction.commit()
            return jsonify({'message': 'Onboarding completed! Redirecting to cuisine selection...', 'redirect': '/cuisine'}), 200

    except Exception as e:
        transaction.rollback()
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/api/user-preferences', methods=['GET'])
def get_user_preferences():
    username = 'Mari'  # ✅ Fetch from session
    if not username:
        return jsonify({"error": "User not logged in"}), 401

    try:
        with db.engine.connect() as connection:
            query = "SELECT allergies, diet FROM user WHERE username = :username"
            result = connection.execute(
                db.text(query),  
                {"username": username}
            ).fetchone()

            if not result:
                return jsonify({"error": "User preferences not found"}), 404

            allergies = result[0] if result[0] else ""
            diet = result[1] if result[1] else ""

            response = jsonify({"allergies": allergies, "diets": diet})
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")  # ✅ Allow frontend
            response.headers.add("Access-Control-Allow-Credentials", "true")  # ✅ Allow cookies/sessions
            return response

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


    


def search_whole_foods(ingredient, num_results=5):
 
    search_url = f"https://www.wholefoodsmarket.com/search?sort=relevance&text={ingredient}"
    headers = {"User-Agent": "Mozilla/5.0"}  
    response = requests.get(search_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

       
        product_tiles = soup.find_all("div", class_="w-pie--product-tile", limit=num_results)

        if not product_tiles:
            return []

        products = []

        for product_tile in product_tiles:
            product_link_tag = product_tile.find("a", class_="w-pie--product-tile__link")
            product_url = "https://www.wholefoodsmarket.com" + product_link_tag.get("href") if product_link_tag else "N/A"
            product_name = product_link_tag.get_text(strip=True) if product_link_tag else "N/A"

            img_tag = product_tile.find("img", {"data-testid": "product-tile-image"})
            product_image_url = img_tag.get("data-src") if img_tag and img_tag.has_attr("data-src") else img_tag.get("src") if img_tag else "N/A"

            product_price = round(random.uniform(1, 14), 2)  # Randomized price for now

            products.append({
                "product_name": product_name,
                "url": product_url,
                "image_url": product_image_url,
                "price": product_price
            })

        return products

    return []


@app.route('/api/search-products', methods=['POST'])
def search_products():
    data = request.get_json()
    missing_ingredients = data.get("ingredients", [])
    print(missing_ingredients)
    if not missing_ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    all_products = {}

    for ingredient in missing_ingredients:
        all_products[ingredient] = search_whole_foods(ingredient)
    print(all_products)
    return jsonify(all_products)

# @app.route('/api/missing-ingredients', methods=['POST'])
# def process_ingredients():
#     data = request.json  
#     selected_ingredients = data.get('ingredients', [])

    
#     return jsonify({
#         "message": "Ingredients received, redirecting to missing ingredients",
#         "redirect": "/missing-ingredients"
#     }), 200

# @app.route('/api/recipes', methods=['GET'])
# def get_recipes():
#     cuisines = request.args.get('cuisines', '')
#     ingredients = request.args.get('ingredients', '')

#     if not cuisines or not ingredients:
#         return jsonify({"error": "Missing cuisines or ingredients"}), 400

#     params = {
#         "apiKey": API_KEY,
#         "cuisine": cuisines,
#         "includeIngredients": ingredients,  # Include selected ingredients
#         "number": 10,
#     }

#     response = requests.get(BASE_URL, params=params)
    
#     if response.status_code == 200:
#         return jsonify(response.json())
#     else:
#         return jsonify({"error": "Failed to fetch recipes"}), response.status_code

@app.route('/api/profile', methods=['GET'])
def get_user_profile():
    print("Session contents:", session)
    user_id = 2
    
    # Check if user is logged in
    if not user_id:
        return jsonify({"error": "Unauthorized - Please log in"}), 401


    # Fetch user data from the database
    with db.engine.connect() as connection:
        query = text("SELECT FullName, Email, Username, Diet, Allergies FROM User WHERE User_ID = :user_id")
        result = connection.execute(query, {"user_id": user_id}).fetchone()

        if not result:
            return jsonify({"error": "User not found"}), 404

        user_details = {
            "FullName": result[0],
            "Email": result[1],
            "Username": result[2],
            "Diet": result[3] or "",
            "Allergies": result[4] or "",
        }

        return jsonify(user_details), 200


@app.route('/api/update-profile', methods=['POST'])
def update_user_profile():
    """Update user profile including diet, allergies, and optional password."""
    

    user_id = 2
    data = request.json

    try:
        with db.engine.connect() as connection:
            query = text("""
                UPDATE User
                SET FullName = :fullname, Email = :email, Username = :username, Diet = :diet, Allergies = :allergies
                WHERE User_ID = :user_id
            """)

            connection.execute(query, {
                'fullname': data['FullName'],
                'email': data['Email'],
                'username': data['Username'],
                'diet': data['Diet'],
                'allergies': data['Allergies'],
                'user_id': user_id
            })

            # Update password only if provided
            if data.get("Password"):
                hashed_password = generate_password_hash(data["Password"])
                connection.execute(text("UPDATE User SET UserPassword = :password WHERE User_ID = :user_id"),
                                   {'password': hashed_password, 'user_id': user_id})

        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask
if __name__ == '__main__':
    app.run(debug=True)
