from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:candidate_id>/<int:employer_id>/', ChatConsumer.as_asgi()),
]