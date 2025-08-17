from django.urls import path, include
from . import views
from .views import object_search

urlpatterns = [
    # Список всех юридических лиц
    path('', views.main, name='main'),
    path('trade/', views.trade, name='trade'),
    path('meal/', views.meal, name='meal'),
    path('services/', views.services, name='services'),
    path('add_trade/', views.add_trade, name='add_trade'),
    path('add_person/', views.add_person, name='add_person'),
    path('add_organization/', views.add_organization, name='add_organization'),
    path('object-search/', object_search, name='object_search'),


    # Детальная информация о юридическом лице
    # path('trade_registry/<int:pk>/', views.legal_entity_detail, name='legal_entity_detail'),
]