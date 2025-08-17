from django import forms
from .models import Object, SpeciesObject, Organization, ObjectOrganization
from .models import Person
from django.core.exceptions import ValidationError


class TradingObjectForm(forms.ModelForm):
    class Meta:
        model = Object
        exclude = ['id_species_object', 'delete_date']
        labels = {
            'kod_okpo': 'Код ОКПО',
            'object_name': 'Название объекта',
            'address': 'Адрес торгового объекта',
            'id_director': 'Глава',
            'id_mo': 'Муниципальное образование',
            'id_kind_activity': 'Под вид деятельности',
            'id_type_object': 'Тип объекта',
            'kind_of_object': 'Разновидность объекта',
            'id_trading_mark': 'Торговая марка',
            'id_form_property': 'Форма собственности',
            'kod_okved': 'Код ОКВЭД',
            'id_type_of_trading_objects': 'Тип торгового объекта',
            'avg_workers': 'Среднее кол-во работников',
        }

        # Опционально: настроить виджет
        widgets = {
            'id_mo': forms.Select(attrs={'class': 'form-control'}),
            'id_trading_mark': forms.Select(attrs={'class': 'form-control'}),
        }


class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = '__all__'


class OrganizationForm(forms.ModelForm):
    linked_objects = forms.ModelMultipleChoiceField(
        queryset=Object.objects.all(),
        required=False,
        widget=forms.SelectMultiple(attrs={'class': 'd-none'}))

    class Meta:
        model = Organization
        fields = '__all__'
