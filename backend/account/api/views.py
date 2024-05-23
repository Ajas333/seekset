from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ParseError,AuthenticationFailed
from .serializer import *
from .email import *
from account.models import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated



class CandidateRegisterView(APIView):
    def post(self,request):
        print("hellooooo")
        print(request.data)
        serializer=CandidateRegisterSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            try:
                user=serializer.save(is_active=False)
                candidate=Candidate.objects.get_or_create(user=user)
                Education.objects.get_or_create(user=user)
                send_otp_via_mail(user.email,user.otp)
                response_data = {
                    'message': 'OTP sent successfully.',
                    'email': user.email,
                }

                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                print("error",e)
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message":"error"}, status=status.HTTP_400_BAD_REQUEST)
        

class EmployerRegisterView(APIView):
    def post(self,request):
        print("hellooooooooo")
        serializer=EmployerRegisterSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user=serializer.save(is_active=False)
                employer=Employer.objects.get_or_create(user=user)
                send_otp_via_mail(user.email,user.otp)
                response_data = {
                    'message': 'OTP sent successfully.',
                    'email': user.email  
                }
                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message":"error"}, status=status.HTTP_400_BAD_REQUEST)
        

class OtpVarificationView(APIView):
    def post(self,request):
        serializer=OtpVerificationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                entered_otp=serializer.validated_data.get('otp')
                user=User.objects.get(email=email)
                if user.otp ==entered_otp:
                    user.is_active=True
                    user.save()
                    if user.user_type == 'candidate':
                        candidate=Candidate.objects.get(user=user)
                        response={
                            'message': 'User registered and verified successfully',
                            "email":email,
                            "username":user.full_name,
                            "completed":candidate.completed,
                            "usertype":user.user_type

                        }
                    if user.user_type == 'employer':
                        response={
                            'message': 'User registered and verified successfully',
                            "email":email,
                            "username":user.full_name,
                            "usertype":user.user_type

                        }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid OTP,Please Check your email and Verify'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found or already verified'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"Error during OTP verification: {e} ")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
class ResendOtpView(APIView):
    def post(self,request):
        email=request.data.get('email')
        print(email)
        try:
            if email is not None:
                resend_otp_via_mail(email)
                response_data = {
                        'message': 'OTP sent successfully.',
                        'email': email  
                    }
                return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ForgotPassView(APIView):
    def post(self,request):
        print(request.data)
        email=request.data.get('email')
        print(email)
        try:
            
            if not User.objects.filter(email=email).exists():
                return Response({"message":"invalid email address"},status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        
            if not User.objects.filter(email=email,is_active=True).exists():
                return Response({"message":"Your blocked by admin"},status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
            user=User.objects.get(email=email)
            forgot_password_mail(email,user.pk)
            
            response_data = {
                    'message': 'link send pleas check your mail',
                    'email': email  
                    }
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"message": "Error"}, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):
    def post(self,request):
        password=request.data.get('password')
        id=request.data.get('id')
        user=User.objects.get(pk=id)
        try:
            if user:
                user.set_password(password)
                user.save()
                usertype=user.user_type
                return Response({"message":"password reset success","usertype":usertype},status=status.HTTP_200_OK)  
    
        except:
            return Response({"message": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        # serializer=ResetPasswordSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        else:
            return Response({"message": "Error"}, status=status.HTTP_400_BAD_REQUEST)
            
class LoginView(APIView):

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            print(email,password)
            if not email or not password:
                raise ParseError("Both email and password are required.")
        except KeyError:
            raise ParseError("Both email and password are required.")
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "Invalid email address."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_active:
            return Response({"message": "Your account is inactive."}, status=status.HTTP_403_FORBIDDEN)
        
        user = authenticate(username=email, password=password)
        if user.user_type == 'candidate':
            candidate=Candidate.objects.get(user=user)
            candidate=CandidateSerializer(candidate).data
            user_data = candidate
        elif user.user_type == 'employer':
            employer=Employer.objects.get(user=user)
            employer=EmployerSerializer(employer).data
            user_data=employer
        print(user)
        if user is None:
            return Response({"message": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        
        refresh = RefreshToken.for_user(user)
        refresh["name"]=str(user.full_name)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        content = {
            'email': user.email,
            'name':user.full_name,
            'access_token': access_token,
            'refresh_token': refresh_token,
            'isAdmin': user.is_superuser,
            'user_type':user.user_type,
            'user_data':user_data
        }
        return Response(content, status=status.HTTP_200_OK)

class AdminLoginView(APIView):
    def post(self,request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            print(email,password)
            if not email or not password:
                raise ParseError("Both email and password are required.")
        except KeyError:
            raise ParseError("Both email and password are required.")
        
        try:
            user = User.objects.get(email=email)
            if not user:
                return Response({"message": "Invalid email address."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "Invalid email address."}, status=status.HTTP_400_BAD_REQUEST)
        if not user.is_superuser:
            
            return Response({"message": "Only Admin can login"}, status=status.HTTP_403_FORBIDDEN)
        
        user = authenticate(username=email, password=password)
        if user is None:
            return Response({"message": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        refresh = RefreshToken.for_user(user)
        refresh["name"]=str(user.full_name)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        content = {
            'email': user.email,
            'name':user.full_name,
            'access_token': access_token,
            'refresh_token': refresh_token,
            'isAdmin': user.is_superuser,
            'user_type':user.user_type,
        }
        return Response(content, status=status.HTTP_200_OK)

class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print("helloooooooooooooo",request)
        user = User.objects.get(id=request.user.id)
        if user.user_type == 'candidate':
            candidate=Candidate.objects.get(user=user)
            candidate=CandidateSerializer(candidate).data
            user_data=candidate
        else:
            employer=Employer.objects.get(user=user)
            employer=EmployerSerializer(employer).data
            user_data=employer
        data = UserSerializer(user).data
        try :
            
            content ={
                'data':data,
                'user_data':user_data
            } 
            
        except:
           content=None
            
        return Response(content)

class CandidateProfileCreation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        user = request.user  # Get the logged-in user
        candidate, created = Candidate.objects.get_or_create(user=user)

        serializer = CandidateProfileSerializer(candidate, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            
            # Update or create Education instance
            education, created = Education.objects.get_or_create(user=user)
            education.education = request.data.get('education')
            education.college = request.data.get('college')
            education.specilization = request.data.get('specilization')
            education.completed = request.data.get('completed')
            education.mark = request.data.get('mark')
            education.save()

            return Response({"message": "Profile updated successfully.","data":serializer.data}, status=status.HTTP_200_OK)
        else:
            # Print serializer errors for debugging
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class EmployerProfileCreatView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        employer,created = Employer.objects.get_or_create(user=user)
        serializer = EmployerProfileSerializer(employer,data=request.data, partial=True)
        if serializer.is_valid():
            employer.completed=True
            employer.save()
            serializer.save()
            return Response({"message": "Profile updated successfully.","data":serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        