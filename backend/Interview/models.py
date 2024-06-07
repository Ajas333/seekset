from django.db import models
from account.models import *
from EmpJobs.models import *
# Create your models here.

class InterviewShedule(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete = models.CASCADE,related_name="candidate")
    employer = models.ForeignKey(Employer, on_delete = models.CASCADE,related_name="employer")
    job = models.ForeignKey(Jobs, on_delete = models.CASCADE,related_name="job")
    date = models.DateTimeField()
    selected = models.BooleanField(default=False)
    status = models.BooleanField(default=True)