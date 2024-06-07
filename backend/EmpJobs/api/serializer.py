from rest_framework import serializers
from account.models import *
from EmpJobs.models import *

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text']
class PostJobSerializer(serializers.ModelSerializer):
    class Meta:
        model= Jobs
        exclude =('posteDate','active','industry','employer')
    
    def create(self,validated_data):
        instance=self.Meta.model(**validated_data)
        if instance is not None:
            instance.save()
            return instance

class EmployerSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Employer
        fields = ['profile_pic', 'user_full_name','headquarters','hr_name','hr_phone','hr_email','address','about','website_link']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer()    
    class Meta:
        model = Jobs
        fields = "__all__"
    
    
class ApplyedJobSerializer(serializers.ModelSerializer):
    job=JobSerializer()
    class Meta:
        model = ApplyedJobs
        fields = ['id', 'job', 'status', 'applyed_on']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):
    education = serializers.SerializerMethodField()
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    email=serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Candidate
        fields = '__all__'

    def get_education(self, obj):
        educations = Education.objects.filter(user=obj.user)
        return EducationSerializer(educations, many=True).data

class ApplyedForJobsSerializer(serializers.ModelSerializer):
    candidate = CandidateSerializer()
    answers = serializers.SerializerMethodField()

    class Meta:
        model = ApplyedJobs
        fields = '__all__'

    def get_answers(self, obj):
        answers = Answer.objects.filter(candidate=obj.candidate, question__job=obj.job)
        return AnswerSerializer(answers, many=True).data

class ApplicationSerializer(serializers.ModelSerializer):
    employer_name = serializers.SerializerMethodField()
    applications = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()
    class Meta:
        model = Jobs
        fields = '__all__'

    def get_employer_name(self, obj):
        return obj.employer.user.full_name
    
    def get_applications(self, obj):
        applications = ApplyedJobs.objects.filter(job=obj)
        serializer = ApplyedForJobsSerializer(applications, many=True)
        return serializer.data
    
    def get_questions(self, obj):
        questions = Question.objects.filter(job=obj)
        if questions.exists():
            return QuestionSerializer(questions, many=True).data
        else:
            return None

class SavedJobSerializer(serializers.ModelSerializer):
    job=JobSerializer()
    class Meta:
        model = SavedJobs
        fields = ['candidate','job']