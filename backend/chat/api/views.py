from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from chat.models import ChatMessage
from .serializer import ChatMessageSerializer


class ChatMessagesAPIView(APIView):
    permission_classes=[]
    def get(self,request, candidate_id, employer_id):
        print("helloooooooooooooooooooooooooooooooooooooooo",candidate_id,employer_id)
        try:
            chatmessages = ChatMessage.objects.filter(candidate=candidate_id,employer=employer_id)
            print(chatmessages)
        except ChatMessage.DoesNotExist:
            return Response({'error':"messeges not found"},status=status.HTTP_404_NOT_FOUND)

        serializer= ChatMessageSerializer(chatmessages, many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)