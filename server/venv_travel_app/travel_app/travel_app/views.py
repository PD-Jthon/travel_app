from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Hotel, Reservation
from .serizlisers import HotelSerializer, ReservationSerializer
from rest_framework import status
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.settings import api_settings
from collections import OrderedDict
import re


class TopPagePagination(PageNumberPagination):
  page_size = 6


class SearchPagePagination(PageNumberPagination):
  page_size = 10

  def get_paginated_response(self, data):
    return (
        [
            ("current", self.page.number),
            ("final", self.page.paginator.num_pages),
            ("count", self.page.paginator.count),
            ("next", self.get_next_link()),
            ("previous", self.get_previous_link()),
            ("results", data),
        ]
    )


class TopView(APIView):
  def get(self, request, *args, **kwargs):
    hotel = Hotel.objects.all()
    serializer = HotelSerializer(hotel, many=True)
    return Response(serializer.data)


class DetailView(APIView):
  def get(self, request, pk, *args, **kwargs):
    hotel = Hotel.objects.filter(id=pk)
    serializer = HotelSerializer(hotel, many=True)
    # print(serializer.data)
    return Response(serializer.data)


# 都道府県で検索をかけた場合の動作
class SearchHotelView(APIView):
  pagination_class = SearchPagePagination
  paginator = pagination_class()

  def get(self, request, pref, *args, **kwargs):
    print(pref)
    pref = pref.strip()
    hotel = Hotel.objects.filter(address__contains=pref)
    page = self.paginator.paginate_queryset(hotel, request, view=self)
    serializer = HotelSerializer(page, many=True)
    response_data = {
        'page_status': {
            "current": self.paginator.page.number,
            "final": self.paginator.page.paginator.num_pages,
            "count": self.paginator.page.paginator.count,
            "next": self.paginator.get_next_link(),
            "previous": self.paginator.get_previous_link(),
        },
        'results': serializer.data,
    }
    return Response(response_data)


# 検索ボックスで検索した際に動作
class SearchView(APIView):
  # pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
  pagination_class = SearchPagePagination
  paginator = pagination_class()

  def get(self, request, word, *args, **kwargs):
    print(word)

    # 空文字で検索した場合全てのレコードを表示するようにする
    if word == 'undefined':
      all_data = Hotel.objects.all()

      # 実験的にページネーションにオブジェクトを渡してみて確認してみる
      page = self.paginator.paginate_queryset(all_data, request, view=self)
      print(page)
      page_status = self.paginator.get_paginated_response(page)
      print('page_status', page_status)
      serializer = HotelSerializer(page, many=True)

      response_data = {
          'page_status': {
              "current": self.paginator.page.number,
              "final": self.paginator.page.paginator.num_pages,
              "count": self.paginator.page.paginator.count,
              "next": self.paginator.get_next_link(),
              "previous": self.paginator.get_previous_link(),
          },
          'results': serializer.data,
      }
      return Response(response_data)
    else:
      convert_word = list(re.split(r'\s+', word))
      print(convert_word)
      for word in convert_word:
        if word == '':
          convert_word.remove(word)
      print(convert_word)

      # 初期化された QuerySet を用意します
      query = Q()

      # 各検索ワードに対して OR 条件を追加します
      for temp in convert_word:
        query |= Q(address__contains=temp) | Q(name__contains=temp)

      # QuerySet を使って一度にデータベース検索を行います
      hotel = Hotel.objects.filter(query)
      page = self.paginator.paginate_queryset(hotel, request, view=self)
      page_status = self.paginator.get_paginated_response(page)

      serializer = HotelSerializer(page, many=True)

      response_data = {
          'page_status': {
              "current": self.paginator.page.number,
              "final": self.paginator.page.paginator.num_pages,
              "count": self.paginator.page.paginator.count,
              "next": self.paginator.get_next_link(),
              "previous": self.paginator.get_previous_link(),
          },
          'results': serializer.data,
      }

      return Response(response_data)


# 予約を作成してDBに登録する
class ReservationView(APIView):
  def post(self, request, *args, **kwargs):
    data = request.data
    print(data)
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
    # print(serializer_data)
    return Response(serializer_data)


# 予約の確認用のモーダルに表示するために情報をシリアライズするビュー
class GetConfirmReservation(APIView):
  def post(self, request, *args, **kwargs):
    data = request.data
    print(data)
    serializer = ReservationSerializer(data=data)
    if serializer.is_valid():
      print(serializer.data)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# max_priceに１泊の値段をセットしておいたのでそこでフィルターすれば良い
class PriceSearchView(APIView):
  pagination_class = SearchPagePagination
  paginator = pagination_class()

  def get(self, request, price, *args, **kwargs):
    data = Hotel.objects.filter(max_price__lte=price)
    page = self.paginator.paginate_queryset(data, request, view=self)

    serializer = HotelSerializer(page, many=True)

    response_data = {
        'page_status': {
            "current": self.paginator.page.number,
            "final": self.paginator.page.paginator.num_pages,
            "count": self.paginator.page.paginator.count,
            "next": self.paginator.get_next_link(),
            "previous": self.paginator.get_previous_link(),
        },
        'results': serializer.data,
    }

    return Response(response_data)


class GetHotelInfoView(APIView):
  def get(self, request, name, *args, **kwargs):
    data = Hotel.objects.filter(name=name)
    serializer = HotelSerializer(data, many=True)
    return Response(serializer.data)


class ChangeReservationView(APIView):
  def post(self, request, pk, *args, **kwargs):
    instance = get_object_or_404(Reservation, pk=pk)
    data = request.data
    print(data)
    serializer = ReservationSerializer(instance=instance, data=data, partial=True)
    print(serializer)
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
