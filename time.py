import time
from datetime import datetime

# Function to log student login event into a text file
def log_student_login(student_name):
    # Get the current date and time when the student logs in
    login_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Log the login event in a text file
    with open("login_log.txt", "a") as log_file:
        log_file.write(f"Student: {student_name} logged in at {login_time}\n")
    
    # Notify the principal about the login event
    notify_principal(student_name, login_time)

# Function to notify the principal (this could be a real notification system in your app)
def notify_principal(student_name, login_time):
    # Simulating a notification to the principal by printing to console
    print(f"Principal Notification: The student {student_name} logged in at {login_time}. Please review the login event.")

# Simulate a student login event
def student_login(student_name):
    # Simulate a successful login for the student
    print(f"Student {student_name} logged in.")
    
    # Log the student login and notify the principal
    log_student_login(student_name)

# Example usage
student_name = "John Doe"  # Example student name
student_login(student_name)
