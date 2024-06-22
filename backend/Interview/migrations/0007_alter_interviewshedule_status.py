# Generated by Django 5.0.4 on 2024-06-14 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Interview', '0006_alter_interviewshedule_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interviewshedule',
            name='status',
            field=models.CharField(choices=[('Selected', 'Selected'), ('You missed', 'You missed'), ('Upcoming', 'Upcoming'), ('Canceled', 'Canceled')], default='Upcoming', max_length=20),
        ),
    ]