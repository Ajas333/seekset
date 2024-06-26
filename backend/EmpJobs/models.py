from django.db import models
from account.models import Employer,Candidate
from django.utils import timezone
# Create your models here.

class Jobs(models.Model):
    title=models.CharField(max_length=60,blank=True, null=True)
    location=models.CharField(max_length=100, blank=True,null=True)
    lpa=models.CharField(max_length=20,blank=True,null=True)
    jobtype=models.CharField(max_length=30,blank=True,null=True)
    jobmode=models.CharField(max_length=30,blank=True,null=True)
    experiance=models.CharField(max_length=30,blank=True,null=True)
    applyBefore=models.DateField(blank=True,null=True)
    posteDate=models.DateTimeField(auto_now_add=True)
    about=models.TextField(blank=True,null=True)
    responsibility=models.TextField(blank=True,null=True)
    active=models.BooleanField(default=True)
    industry=models.CharField(blank=True,null=True)
    employer=models.ForeignKey(Employer,on_delete=models.CASCADE, related_name="employer_jobs")

    def __str__(self) -> str:
        return self.title

class Question(models.Model):
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()


class Answer(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.TextField()

    
class SavedJobs(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE)
    job=models.ForeignKey(Jobs,on_delete=models.CASCADE)

class ApplyedJobs(models.Model):
    choice=(
        ("Application Send","Application Send"),
        ("Application Viewd","Application Viewd"),
        ("Resume Viewd","Resume Viewd"),
        ("Interview Sheduled","Interview Sheduled"),
        ("Interview Cancelled","Interview Cancelled"),
        ("Accepted","Accepted"),
        ("Rejected","Rejected")
    )
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE)
    job=models.ForeignKey(Jobs,on_delete=models.CASCADE)
    status=models.CharField(max_length=20,choices=choice, default="Application Send")
    applyed_on = models.DateTimeField(auto_now_add=True)
