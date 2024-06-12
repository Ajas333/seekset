from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from account.models import *
from Interview.models import *
from EmpJobs.models import *
from .email import send_shedule,cancelMail
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
        serializer = SheduleInterviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            send_shedule(email,date,user,title)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CancelApplicationView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        user=request.user
        candidate_id = request.data.get('candidate_id')
        job_id = request.data.get('job_id')
        job=Jobs.objects.get(id=job_id)
        candidate=Candidate.objects.get(id=candidate_id)
        application = InterviewShedule.objects.get(job=job_id,candidate=candidate_id)
        applyed = ApplyedJobs.objects.get(candidate=candidate_id,job=job_id)
        email=candidate.user.email
        date=application.date
        title=job.title
        try:
            if application:
                application.active = False
                application.status = "Canceled"
                applyed.status='Interview Cancelled'
                application.save()
                applyed.save()
                cancelMail(email,date,user,title)
                return Response({"message":"application cancelled sucessfull"},status=status.HTTP_200_OK)
        except application.DoesNotExist:
            return Response({"message":"something went wrong"},status=status.HTTP_404_NOT_FOUND)
        
class getShedulesView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user = request.user
        try:
            try:
                candidate = Candidate.objects.get(user=user)
                shedules=InterviewShedule.objects.filter(candidate=candidate)
            except Candidate.DoesNotExist:
                employer = Employer.objects.get(user=user)
                shedules=InterviewShedule.objects.filter(employer=employer)
       
            print(shedules)
            serializer = InterviewSheduleSerializer(shedules, many=True)
            if serializer:
                return Response (serializer.data,status=status.HTTP_200_OK)
            
        except (Candidate.DoesNotExist, Employer.DoesNotExist):
            return Response({"message": "User is neither a candidate nor an employer"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

