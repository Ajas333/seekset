# Generated by Django 5.0.4 on 2024-05-29 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmpJobs', '0005_applyedjobs'),
    ]

    operations = [
        migrations.AddField(
            model_name='applyedjobs',
            name='applyed_on',
            field=models.DateTimeField(auto_now_add=True, default='2018-11-20T15:58:44.767594-06:00'),
            preserve_default=False,
        ),
    ]