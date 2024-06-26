# Generated by Django 5.0.4 on 2024-05-13 14:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_user_otp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('First_name', models.CharField(blank=True, max_length=15, null=True)),
                ('last_name', models.CharField(blank=True, max_length=15, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='profile_pic')),
                ('linkedin', models.CharField(blank=True, max_length=150, null=True)),
                ('github', models.CharField(blank=True, max_length=150, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Candidate_profile', to='account.user')),
            ],
        ),
    ]
