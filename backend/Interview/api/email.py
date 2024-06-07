from django.core.mail import send_mail
import random
from django.conf import settings
from datetime import datetime

def send_shedule(email, date, user, title):
    try:
       
        
        # Construct the email subject and body
        subject = "Interview Schedule Notification"
        email_from = settings.EMAIL_HOST_USER
        message = (f"Dear Candidate,\n\n"
                   f"This email is to inform you about your upcoming interview.\n\n"
                   f"Company: {user}\n"
                   f"Job Title: {title}\n"
                   f"Date & Time: {date}\n\n"
                   f"Please ensure you are available for the interview at the scheduled time.\n\n"
                   f"Best regards,\n"
                   f"{user}")

        # Print the email details to the console
        print("Email details:")
        print(f"From: {email_from}")
        print(f"To: {email}")
        print(f"Subject: {subject}")
        print("Message:")
        print(message)
        
        # Send the email
        send_mail(subject, message, email_from, [email])
        print(f"Email sent successfully to {email}")
    except Exception as e:
        print(f'Error sending email: {e}')
