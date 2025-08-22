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
    path('object-search/', views.object_search, name='object_search'),
    path('object/<int:object_id>/view/', views.view_object, name='view_object'),
    path('object/<int:object_id>/edit/', views.edit_object, name='edit_object'),
    path('owners/', views.owners, name='owners'),
    path('organization/', views.organization, name='organization'),
    path('report/', views.report, name='report'),
    path('meal/', views.meal, name='meal'),
    path('services/', views.services, name='services'),
    path('export/trade-marks-report/', views.export_trade_marks_report, name='export_trade_marks_report'),

    # Детальная информация о юридическом лице
    # path('trade_registry/<int:pk>/', views.legal_entity_detail, name='legal_entity_detail'),
]