from rest_framework import serializers
from .models import Hotel, Reservation
from datetime import date


class HotelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hotel
    fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
  user_name = serializers.CharField(source='user.username', read_only=True)
  hotel_name = serializers.CharField(source='hotel.name', read_only=True)
  created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
  updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

  class Meta:
    model = Reservation
    fields = '__all__'

    check_in = serializers.DateField()

    def validate_check_in(self, value):
      if value < date.today():
        raise serializers.ValidationError('Check-in date cannot be in the past.')
      return value
