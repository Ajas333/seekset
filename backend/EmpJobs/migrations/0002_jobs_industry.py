# Generated by Django 5.0.4 on 2024-05-23 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmpJobs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobs',
            name='industry',
            field=models.CharField(blank=True, null=True),
        ),
    ]
