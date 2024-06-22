# Generated by Django 5.0.4 on 2024-06-14 18:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0014_candidate_place'),
        ('chat', '0003_remove_chatmessage_candidate_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CandidateNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_read', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.candidate')),
            ],
        ),
    ]
