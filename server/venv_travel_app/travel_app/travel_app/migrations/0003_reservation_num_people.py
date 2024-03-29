# Generated by Django 4.2 on 2024-01-29 12:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_app', '0002_reservation'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='num_people',
            field=models.IntegerField(default=1, max_length=55, validators=[django.core.validators.MinValueValidator(1)], verbose_name='人数'),
        ),
    ]
