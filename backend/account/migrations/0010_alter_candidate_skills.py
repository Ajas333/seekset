# Generated by Django 5.0.4 on 2024-05-22 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0009_alter_user_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='skills',
            field=models.TextField(blank=True, max_length=10, null=True),
        ),
    ]
