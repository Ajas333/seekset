# Generated by Django 5.0.4 on 2024-06-12 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Interview', '0004_alter_interviewshedule_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interviewshedule',
            name='status',
            field=models.CharField(choices=[('You missed', 'You missed'), ('Selected', 'Selected'), ('Upcoming', 'Upcoming'), ('Canceled', 'Canceled')], default='Upcoming', max_length=20),
        ),
    ]
