from rest_framework import serializers
from Interview.models import *
from EmpJobs.models import *

class InterviewSheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewShedule
        fields = ['id','candidate', 'employer', 'job', 'date']
        read_only_fields = ['employer']

    def create(self, validated_data): 
        request = self.context.get('request')
        user = request.user
        employer = Employer.objects.get(user=user)
        validated_data['employer'] = employer
        return super().create(validated_data)