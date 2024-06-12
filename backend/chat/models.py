from django.db import models
from account.models import Candidate,Employer
from EmpJobs.models import ApplyedJobs
# Create your models here.

class ChatMessage(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='sent_messages')
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField(default="", null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    sendername = models.TextField(max_length=100, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.candidate} to {self.employer}: {self.message}'
