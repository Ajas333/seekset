from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from account.models import *
from Interview.models import *
from EmpJobs.models import *
from .email import send_shedule
from rest_framework.permissions import IsAuthenticated

class InterviewSheduleView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        user = request.user
        candidate_id = request.data.get('candidate')
        job_id = request.data.get('job')
        date = request.data.get('date')
       
        try:
            candidate=Candidate.objects.get(id=candidate_id)
            job=Jobs.objects.get(id=job_id)
            email=candidate.user.email
            title=job.title
            print(email,date,user,title)
        except Candidate.DoesNotExist:
            print("error")
        print(request.data)
        serializer = InterviewSheduleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            send_shedule(email,date,user,title)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CancelApplicationView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,):
        candidate_id = request.data.get('candidate_id')
        job_id = request.data.get('job_id')
        application = InterviewShedule.objects.get(job=job_id,candidate=candidate_id)
        applyed = ApplyedJobs.objects.get(candidate=candidate_id,job=job_id)
        try:
            if application:
                application.status = False
                applyed.status='Interview Cancelled'
                application.save()
                applyed.save()
                return Response({"message":"application cancelled sucessfull"},status=status.HTTP_200_OK)
        except application.DoesNotExist:
            return Response({"message":"something went wrong"},status=status.HTTP_404_NOT_FOUND)
        