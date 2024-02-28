from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Hotel, Reservation
from .serizlisers import HotelSerializer, ReservationSerializer
from rest_framework import status
from django.db.models import Q
import re
from rest_framework.permissions import IsAuthenticated


class TopView(APIView):
  def get(self, request, *args, **kwargs):
    hotel = Hotel.objects.all()
    serializer = HotelSerializer(hotel, many=True)
    return Response(serializer.data)


class DetailView(APIView):
  def get(self, request, pk, *args, **kwargs):
    hotel = Hotel.objects.filter(id=pk)
    serializer = HotelSerializer(hotel, many=True)
    return Response(serializer.data)


# 都道府県で検索をかけた場合の動作
class SearchHotelView(APIView):

  def get(self, request, pref, *args, **kwargs):
    pref = pref.strip()
    hotel = Hotel.objects.filter(address__contains=pref)
    serializer = HotelSerializer(hotel, many=True)
    return Response(serializer.data)


# 検索ボックスで検索した際に動作
class SearchView(APIView):

  def get(self, request, word, *args, **kwargs):
    # 空文字で検索した場合全てのレコードを表示するようにする
    if word == 'undefined':
      all_data = Hotel.objects.all()

      # 実験的にページネーションにオブジェクトを渡してみて確認してみる
      serializer = HotelSerializer(all_data, many=True)
      return Response(serializer.data)
    else:
      convert_word = list(re.split(r'\s+', word))
      for word in convert_word:
        if word == '':
          convert_word.remove(word)
      # 初期化された QuerySet を用意します
      query = Q()
      # 各検索ワードに対して OR 条件を追加します
      for temp in convert_word:
        query |= Q(address__contains=temp) | Q(name__contains=temp)
      # QuerySet を使って一度にデータベース検索を行います
      hotel = Hotel.objects.filter(query)
      serializer = HotelSerializer(hotel, many=True)
      return Response(serializer.data)


# 予約を作成してDBに登録する
class ReservationView(APIView):
  def post(self, request, *args, **kwargs):
    data = request.data
    serializer = ReservationSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ログイン中のユーザーの予約を全て取得するビュー
class GetReservationView(APIView):
  def get(self, request, id, *args, **kwargs):
    data = Reservation.objects.filter(user=id)
    serializer = ReservationSerializer(data, many=True)
    serializer_data = serializer.data
    return Response(serializer_data)


# 予約の確認用のモーダルに表示するために情報をシリアライズするビュー
class GetConfirmReservation(APIView):
  def post(self, request, *args, **kwargs):
    data = request.data
    serializer = ReservationSerializer(data=data)
    if serializer.is_valid():
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# max_priceに１泊の値段をセットしておいたのでそこでフィルターすれば良い
class PriceSearchView(APIView):
  def get(self, request, price, *args, **kwargs):
    data = Hotel.objects.filter(max_price__lte=price)
    serializer = HotelSerializer(data, many=True)
    return Response(serializer.data)


class GetHotelInfoView(APIView):
  def get(self, request, name, *args, **kwargs):
    data = Hotel.objects.filter(name=name)
    serializer = HotelSerializer(data, many=True)
    return Response(serializer.data)


class ChangeReservationView(APIView):
  def post(self, request, pk, *args, **kwargs):
    instance = get_object_or_404(Reservation, pk=pk)
    data = request.data
    serializer = ReservationSerializer(instance=instance, data=data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)


class DeleteReservationView(APIView):
  def get(self, request, pk, *args, **kwargs):
    instance = get_object_or_404(Reservation, pk=pk)
    if instance:
      instance.delete()
      return Response(True, status=status.HTTP_200_OK)
    return Response(False, status=status.HTTP_400_BAD_REQUEST)


class CheckLoginStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(True)
        else:
            return Response(False)

class GetLoginUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_profile = request.user
        return Response(user_profile)