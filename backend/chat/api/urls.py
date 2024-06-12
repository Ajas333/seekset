from django.urls import path
from .views import *

urlpatterns = [
    path('chat-messages/transaction/<str:application_id>/', TransactionChatMessagesAPIView.as_view(), name='transaction-chat-messages'),
    
]
