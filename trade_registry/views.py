from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET

from .forms import TradingObjectForm, PersonForm, OrganizationForm
from .models import Object, Person, SpeciesObject


def main(request):
    return render(request, 'trade_registry/main.html')


def trade(request):
    # Получаем все записи из модели LegalEntity
    objects = Object.objects.all()
    context = {
        'objects': objects,
    }
    return render(request, 'trade_registry/trade.html', context)


def meal(request):
    # Получаем все записи из модели LegalEntity
    objects = Object.objects.all()
    context = {
        'objects': objects,
    }
    return render(request, 'trade_registry/meal.html', context)


def services(request):
    # Получаем все записи из модели LegalEntity
    objects = Object.objects.all()
    context = {
        'objects': objects,
    }
    return render(request, 'trade_registry/services.html', context)


def add_trade(request):
    speciesObject = SpeciesObject.objects.get(name='Торговля')
    if request.method == 'POST':
        form = TradingObjectForm(request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            print(speciesObject.id)
            print(speciesObject.name)
            obj.id_species_object_id = speciesObject.id  # Программно задаём
            obj.save()
            # После сохранения можно перенаправить обратно на страницу trade
            return redirect('trade')
    else:
        form = TradingObjectForm()

    return render(request, 'trade_registry/add_trade.html', {'form': form})


def add_person(request):
    if request.method == 'POST':
        form = PersonForm(request.POST)
        if form.is_valid():
            form.save()
            # После сохранения можно перенаправить обратно на страницу trade
            return redirect('trade')
    else:
        form = PersonForm()

    return render(request, 'trade_registry/add_person.html', {'form': form})


def add_organization(request):
    if request.method == 'POST':
        form = OrganizationForm(request.POST)
        if form.is_valid():
            organization = form.save()  # Связи сохранятся автоматически
            return redirect('organization_list')  # или куда нужно
    else:
        form = OrganizationForm()

    return render(request, 'trade_registry/add_organization.html', {'form': form})


@require_GET
def object_search(request):
    query = request.GET.get('q', '').strip()
    print(query)
    if not query:
        return JsonResponse([], safe=False)

    # Используем object_name вместо name
    objects = Object.objects.filter(object_name__icontains=query)[:10]
    results = [{'id': obj.id, 'name': obj.object_name} for obj in objects]  # Здесь тоже object_name
    return JsonResponse(results, safe=False)