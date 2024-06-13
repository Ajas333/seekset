from django.urls import path
from .views import *

urlpatterns = [
    path('chat-messages/<int:candidate_id>/<int:employer_id>/', ChatMessagesAPIView.as_view(), name='chat-messages'),
    
]
