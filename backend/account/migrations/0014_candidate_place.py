# Generated by Django 5.0.4 on 2024-05-30 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_employer_hr_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='place',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
