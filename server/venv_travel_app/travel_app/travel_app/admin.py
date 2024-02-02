from django.contrib import admin
from .models import Hotel, Reservation

class HotelAdmin(admin.ModelAdmin):
  list_display = ('id', 'name',)
  search_fields = ('name',)

class ReservationAdmin(admin.ModelAdmin):
  list_display = ('id', 'user', 'hotel',)
  search_fields = ('user',)

admin.site.register(Hotel, HotelAdmin)
admin.site.register(Reservation, ReservationAdmin)