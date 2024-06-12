from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from EmpJobs.models import ApplyedJobs
from account.models import Candidate,Employer
import json
from .models import ChatMessage

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print("testing connection and redis")
        self.candidate_id = self.scope['url_route']['kwargs']['candidate_id']
        self.employer_id = self.scope['url_route']['kwargs']['employer_id']

        print(f"WebSocket connection for candidate: {self.candidate_id}, employer: {self.employer_id}")

        self.candidate = await self.get_candidate_instance(self.candidate_id)
        self.employer = await self.get_employer_instance(self.employer_id)
        print("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj",self.candidate,self.employer)

        await self.channel_layer.group_add(
            f'chat_{self.candidate_id}_{self.employer_id}',
            self.channel_name

        )

        await self.accept()

        # Fetch existing messages and send them to the connected client
        existing_messages = await self.get_existing_messages()
        for message in existing_messages:
            await self.send(text_data=json.dumps({
                'message': message['message'],
            }))

    @database_sync_to_async
    def get_existing_messages(self):
        messages = ChatMessage.objects.filter(candidate=self.candidate, employer=self.employer)
        return [{'message': message.message} for message in messages]


    @database_sync_to_async
    def get_candidate_instance(self, candidate_id):
        try:
            candidate = Candidate.objects.get(id=candidate_id)
            candidate.user  # This will force the related object to be cached
            return candidate
        except Candidate.DoesNotExist:
            return None

    @database_sync_to_async
    def get_employer_instance(self, employer_id):
        try:
            employer = Employer.objects.get(id=employer_id)
            employer.user  # This will force the related object to be cached
            return employer
        except Employer.DoesNotExist:
            return None
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            f'chat_{self.candidate_id}_{self.employer_id}',
            self.channel_name
        )
    
    async def receive(self,text_data):
        data = json.loads(text_data)
        message = data['message']
        print("message..........",message)
        sendername = data.get('sendername', 'Anonymous')

        await self.save_message(sendername,message)
        await self.channel_layer.group_send(
            f'chat_{self.candidate_id}_{self.employer_id}',
            {
                'type':'chat.message',
                'data':{
                    'message': message,
                    'sendername': sendername,
                }
            }
        )

    async def chat_message(self, event):
        message = event['data']['message']
        sendername = event['data']['sendername']

        await self.send(text_data=json.dumps({
            'message': message,
            'sendername': sendername,
        }))
    
    @classmethod
    async def send_chat_message(cls, candidate_id,employer_id,message):
        await cls.send_group(f'chat_{candidate_id}_{employer_id}', {
            'type': 'chat.message',
            'message': message,
        })
    
    async def save_message(self,sendername,message):
        try:
            candidate = await self.get_candidate_instance(self.candidate_id)
            employer = await self.get_employer_instance(self.employer_id)
            await self.save_message_to_db(candidate, employer, sendername, message)
        except:
            print("message could not save....")
    
    
    @database_sync_to_async
    def save_message_to_db(self,candidate,employer,sendername,message):
        try:
            ChatMessage.objects.create(
                candidate = candidate,
                employer = employer,
                message = message,
                sendername = sendername
            )
            print("message saved to database")
        except:
            print("something went wrong.....")
    
    
