from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# from phonenumber_field.modelfields import PhoneNumberField
from accounts.models import CustomUser
from django.core.validators import MaxValueValidator, MinValueValidator


class Hotel(models.Model):
  """ホテルモデル"""

  name = models.CharField(verbose_name='ホテル名', max_length=40, blank=False)
  description = models.TextField(verbose_name='説明', blank=False)
  price_range = models.CharField(
      verbose_name='価格帯', max_length=20, blank=False)
  max_capacity = models.CharField(verbose_name='定員', max_length=127, blank=True)
  max_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  min_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  zip_number = models.CharField(
      verbose_name='郵便番号', max_length=20, blank=True)
  address = models.CharField(verbose_name='住所', max_length=60, blank=False)
  # open_time = models.CharField(
  #     verbose_name='営業''時間', max_length=40, blank=False)
  # close_day = models.CharField(verbose_name='定休日', max_length=40, null=True)
  # seates_number = models.CharField(
  #     verbose_name='座席数', max_length=20, blank=True)
  phone_number = models.CharField(unique=True, null=False, blank=False, max_length=127)
  category = models.CharField(
      verbose_name='カテゴリ',
      max_length=20,
      null=True,
  )
  # rating用のモデルを追加した
  score = models.IntegerField(default=0,
                              validators=[
                                  MaxValueValidator(5),
                                  MinValueValidator(0),
                              ]
                              )
  photo = models.ImageField(verbose_name='写真', blank=True)
  # created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
  average = models.FloatField(verbose_name='平均点', default=0.0)
  rounded_avg = models.FloatField(verbose_name='丸めた平均点', default=0.0)
  created_at = models.DateTimeField(verbose_name="作成日時", auto_now_add=True)
  updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

  class Meta:
    verbose_name_plural = 'Hotel'

  def __str__(self):
    return self.name


class Reservation(models.Model):

  class Meta:
    db_table = 'Reservation'
    verbose_name_plural = 'Reservation'

  def __str__(self):
    return f"{self.user.username} - {self.hotel.name}"

  hotel = models.ForeignKey('Hotel', verbose_name='ホテル', on_delete=models.CASCADE)
  user = models.ForeignKey(CustomUser, verbose_name='ユーザー', on_delete=models.CASCADE)
  check_in = models.DateField(verbose_name='チェックイン')
  check_out = models.DateField(verbose_name='チェックアウト')
  num_people = models.IntegerField(verbose_name='人数', default=1, validators=[MinValueValidator(1)])
  created_at = models.DateTimeField(verbose_name="作成日時", auto_now_add=True, null=True, blank=True)
  updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True, null=True, blank=True)
