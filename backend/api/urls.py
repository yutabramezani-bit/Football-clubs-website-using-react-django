from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('country', CountryViewSet, basename='country')
router.register('league', LeagueViewSet, basename='league')
router.register('characteristic', CharacteristicViewSet, basename='characteristic')
router.register('footballClub', FootballClubViewSet, basename='footballClub')

urlpatterns = router.urls