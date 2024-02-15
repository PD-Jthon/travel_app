from django.urls import path

from .import views

app_name = 'travel_app'
urlpatterns = [
    path('', views.TopView.as_view(), name='top'),
    path('detail/<int:pk>', views.DetailView.as_view(), name='detail'),
    path('search/<str:pref>', views.SearchHotelView.as_view(), name='search'),
    path('search-word/<str:word>', views.SearchView.as_view(), name='search-word'),
    path('reservation/', views.ReservationView.as_view(), name='reservation'),
    path('get-reservation/<int:id>', views.GetReservationView.as_view(), name='get-reservation'),
    path('confirm-reservation/', views.GetConfirmReservation.as_view(), name='confirm-reservation'),
    path('search-price/<int:price>', views.PriceSearchView.as_view(), name='search-price'),
    path('get-hotel-info/<str:name>', views.GetHotelInfoView.as_view(), name='get-hotel-info'),
    path('change-reservation/<int:pk>', views.ChangeReservationView.as_view(), name='change-reservation'),
    path('delete-reservation/<int:pk>', views.DeleteReservationView.as_view(), name='delete-reservation'),
    # path('search/<str:value>', views.SearchView.as_view(), name='search-top'),
]
