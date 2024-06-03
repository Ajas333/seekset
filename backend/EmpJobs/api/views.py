from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from account.models import *
from rest_framework.permissions import IsAuthenticated



class PostJob(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        print(request)
        user=request.user
        employer=Employer.objects.get(user=user)
        jobs =Jobs.objects.create(employer=employer)
        serializer=PostJobSerializer(jobs,data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "job posted successfull."}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"some thing went wrong pleas do it again"},status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class GetJob(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user=request.user
        print(user)
        try:
            employer = Employer.objects.get(user=user)
            print(employer)
            print("job details........")
            jobs = Jobs.objects.filter(employer=employer)
            print(jobs)
            serializer = JobSerializer(jobs, many=True)
            data = {
                "data": serializer.data
            }
            return Response(data, status=status.HTTP_200_OK)
        except Employer.DoesNotExist:
            return Response({"error": "Employer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllJob(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        try:
            jobs=Jobs.objects.filter(active=True)
            serializer=JobSerializer(jobs,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetJobDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,job_id):
        try:    
            job=Jobs.objects.get(id=job_id)
            serializer=JobSerializer(job)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class GetJobStatus(APIView):
    permission_classes= [IsAuthenticated]
    def post(self,request,job_id):
        print(request.headers)
        action = request.data.get('action')
        try:
            job=Jobs.objects.get(id=job_id)
            if action == 'deactivate':
                job.active = False
            elif action == 'activate':
                job.active = True
            job.save()
            return Response({"message","job Status change"},status=status.HTTP_200_OK)
        except:
             return Response(status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class SavejobStatus(APIView):
    permission_classes= [IsAuthenticated]
    def post(self,request,job_id):
        action = request.data.get('action')
        user = request.user
        try:
            job = Jobs.objects.get(id=job_id)
            candidate= Candidate.objects.get(user=user)
            if action == 'save':

                if not SavedJobs.objects.filter(candidate=candidate, job=job).exists():
                    SavedJobs.objects.create(candidate=candidate, job=job)
                    return Response({"message": "Job saved successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Job is already saved"}, status=status.HTTP_200_OK)

            elif action == 'unsave':
                saved_job = SavedJobs.objects.filter(candidate=candidate, job=job).first()
                if saved_job:
                    saved_job.delete()
                    return Response({"message": "Job unsaved successfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Job is not saved"}, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response({"message": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        except Jobs.DoesNotExist:
            return Response({"message": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
        except Candidate.DoesNotExist:
            return Response({"message": "Candidate not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class Applyjob(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, job_id):
        user = request.user
        try:
            job = Jobs.objects.get(id=job_id)
            candidate = Candidate.objects.get(user=user)

            if ApplyedJobs.objects.filter(candidate=candidate, job=job).exists():
                return Response({"message": "You have already applied for this job"}, status=status.HTTP_200_OK)

            ApplyedJobs.objects.create(candidate=candidate, job=job)
            return Response({"message": "Job applied successfully"}, status=status.HTTP_201_CREATED)

        except Jobs.DoesNotExist:
            return Response({"message": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
        except Candidate.DoesNotExist:
            return Response({"message": "Candidate not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetApplyedjob(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user = request.user
        try:
            candidate = Candidate.objects.get(user=user)
            applied_jobs = ApplyedJobs.objects.filter(candidate=candidate)
            serializer = ApplyedJobSerializer(applied_jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Candidate.DoesNotExist:
            return Response({"message": "Candidate not found"}, status=404)
        except Exception as e:
            return Response({"message": str(e)}, status=500)
        
class GetApplicationjob(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        user=request.user
        try:
            employer=Employer.objects.get(user=user)
            jobs = Jobs.objects.filter(employer=employer,active=True)  
            serializer = ApplicationSerializer(jobs, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        
class JobStatus(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,id):
       
        try:
            appyedjob=ApplyedJobs.objects.get(id=id)
            appyedjob.status = "Accepted"
            appyedjob.save()
            print(appyedjob)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


