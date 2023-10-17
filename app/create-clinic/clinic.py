from flask import Flask, request, render_template, redirect, url_for
import uuid
import random
import string
import psycopg2  # PostgreSQL library

app = Flask(__name__)

# Configure your PostgreSQL connection
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="pR0j3ctuR@nUs",
    host="db.qhstkjlizixqpnephole.supabase.co"
)

def generate_unique_code():
    # Generate a unique clinic code
    code_length = 16
    characters = string.ascii_letters + string.digits + "!@#$%^&*()"
    while True:
        code = ''.join(random.choice(characters) for _ in range(code_length))
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM clinics WHERE code = %s", (code,))
        if cursor.fetchone() is None:
            return code

# Check if a user is a clinician
def user_is_clinician(user_id):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM clinicians WHERE userId = %s", (user_id,))
    clinician_count = cursor.fetchone()[0]
    cursor.close()
    return clinician_count > 0

@app.route('/create-clinic', methods=['GET', 'POST'])
def create_clinic():
    if not user_is_clinician():
        return redirect(url_for('login'))

    if request.method == 'POST':
        clinic_name = request.form.get('clinic_name')
        cursor = conn.cursor()
        try:
            # Generate a unique clinic code
            clinic_code = generate_unique_code()
            
            # Get the clinician's ID based on your authentication logic
            print(session)
            owner_id = get_clinician_id()

            # Insert the new clinic into the database
            cursor.execute("INSERT INTO clinics (id, owner, code, name) VALUES (%s, %s, %s, %s)",
                           (uuid.uuid4(), owner_id, clinic_code, clinic_name))
            conn.commit()

            # Display the code to the user
            success_message = f"Your clinic code: {clinic_code}"

        except Exception as e:
            error_message = str(e)
        finally:
            cursor.close()

    return render_template('create_clinic.html')  # Create an HTML template for the form
