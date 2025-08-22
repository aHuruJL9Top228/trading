# core/models.py
from django.db import models


class TypeOrganization(models.Model):
    name_of_type = models.CharField("Тип организации", max_length=255)

    class Meta:
        verbose_name = "Тип организации"
        verbose_name_plural = "Типы организаций"

    def __str__(self):
        return self.name_of_type


class Person(models.Model):
    fio_person = models.CharField("ФИО владельца", max_length=255)
    phone_number = models.CharField("Телефон", max_length=255, blank=True, null=True)
    email = models.EmailField("Email", blank=True, null=True)
    inn = models.CharField("ИНН", max_length=12, blank=True, null=True)

    class Meta:
        verbose_name = "Глава"
        verbose_name_plural = "Главы"

    def __str__(self):
        return self.fio_person


class TradingMark(models.Model):
    brand_name = models.CharField("Торговая марка", max_length=255)

    class Meta:
        verbose_name = "Торговая марка"
        verbose_name_plural = "Торговые марки"

    def __str__(self):
        return self.brand_name


class KindObject(models.Model):
    name = models.CharField("Вид объекта", max_length=255)

    class Meta:
        verbose_name = "Вид объекта"
        verbose_name_plural = "Виды объектов"

    def __str__(self):
        return self.name


class FormProperty(models.Model):
    name_of_form_property = models.CharField("Форма собственности", max_length=255)

    class Meta:
        verbose_name = "Форма собственности"
        verbose_name_plural = "Формы собственности"

    def __str__(self):
        return self.name_of_form_property


class Organization(models.Model):
    name = models.CharField("Название организации", max_length=255)
    type_organization = models.ForeignKey(
        TypeOrganization,
        on_delete=models.SET_NULL,
        verbose_name="Тип организации",
        blank=True,
        null=True
    )
    owner = models.ForeignKey(
        Person,
        on_delete=models.SET_NULL,
        verbose_name="Владелец",
        blank=True,
        null=True
    )
    kod_okopf = models.CharField("Код ОКОПФ", max_length=10, blank=True, null=True)
    kod_okpo = models.CharField("Код ОКПО", max_length=10, blank=True, null=True)
    address = models.CharField("Адрес", blank=True, null=True)

    class Meta:
        verbose_name = "Организация"
        verbose_name_plural = "Организации"

    def __str__(self):
        return self.name


class SpeciesObject(models.Model):
    name = models.CharField("Вид объекта", max_length=255)

    class Meta:
        verbose_name = "Вид объекта"
        verbose_name_plural = "Виды объектов"

    def __str__(self):
        return self.name

class TypeOfTradingObject(models.Model):
    name = models.CharField("Тип торгового объекта", max_length=255)

    class Meta:
        verbose_name = "Тип торгового объекта"
        verbose_name_plural = "Типы торговых объектов"

    def __str__(self):
        return self.name


class Object(models.Model):
    kod_okpo = models.CharField("Код ОКПО", max_length=10, blank=True, null=True)
    object_name = models.CharField("Название объекта", max_length=255)
    address = models.CharField("Адрес объекта")
    fio_director = models.CharField("ФИО директора", max_length=255)
    phone_number_director = models.CharField("Номер телефона директора", max_length=255)
    email_director = models.CharField("Эл. почта директора", max_length=255)
    mo = models.ForeignKey(
        'Municipality',
        on_delete=models.SET_NULL,
        verbose_name="Муниципальное образование",
        blank=True,
        null=True
    )
    kind_activity = models.ForeignKey(
        'ActivityKind',
        on_delete=models.SET_NULL,
        verbose_name="Под вид деятельности",
        blank=True,
        null=True
    )
    type_object = models.ForeignKey(
        'ObjectType',
        on_delete=models.SET_NULL,
        verbose_name="Тип объекта",
        blank=True,
        null=True
    )
    registration_date = models.DateTimeField("Дата регистрации", auto_now_add=True)
    update_date = models.DateTimeField("Дата обновления", auto_now=True)
    delete_date = models.DateTimeField("Дата удаления", blank=True, null=True)

    trading_mark = models.ForeignKey(
        TradingMark,
        on_delete=models.SET_NULL,
        verbose_name="Торговая марка",
        blank=True,
        null=True
    )
    form_property = models.ForeignKey(
        FormProperty,
        on_delete=models.SET_NULL,
        verbose_name="Форма собственности",
        blank=True,
        null=True
    )
    avg_workers = models.FloatField("Среднее кол-во работников", blank=True, null=True)

    species_object = models.ForeignKey(
        SpeciesObject,
        on_delete=models.SET_NULL,
        verbose_name="Вид объекта",
        blank=True,
        null=True
    )

    kod_okved = models.CharField("Код ОКВЭД", max_length=10, blank=True, null=True)

    type_of_trading_objects = models.ForeignKey(
        TypeOfTradingObject,
        on_delete=models.SET_NULL,
        verbose_name="Тип торгового объекта",
        blank=True,
        null=True
    )

    kind_of_object = models.ForeignKey(
        KindObject,
        on_delete=models.SET_NULL,
        verbose_name="Разновидность объекта",
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = "Объект"
        verbose_name_plural = "Объекты"

    def __str__(self):
        return self.object_name


class ObjectOrganization(models.Model):
    object = models.ForeignKey(
        Object,
        on_delete=models.CASCADE,
        verbose_name="Объект"
    )
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        verbose_name="Организация"
    )

    class Meta:
        verbose_name = "Связь объект-организация"
        verbose_name_plural = "Связи объект-организация"
        unique_together = ('object', 'organization')

    def __str__(self):
        return f"{self.id_organization} - {self.object}"


# Дополнительные модели для связей
class Municipality(models.Model):
    name = models.CharField("Название", max_length=255)

    class Meta:
        verbose_name = "Муниципальное образование"
        verbose_name_plural = "Муниципальные образования"

    def __str__(self):
        return self.name

class SquareRoz(models.Model):
    object = models.ForeignKey(
        Object,
        on_delete=models.CASCADE,  # Лучше CASCADE, если при удалении объекта удаляется и площадь
        verbose_name="Торговый объект",
        related_name="square_roz"  # Удобно: object.square_roz.all()
    )

    all_owner = models.FloatField("Общая площадь на праве собственности", blank=True, null=True)
    all_law = models.FloatField("Общая площадь иное законное основание (аренда)", blank=True, null=True)
    trade_obj_owner = models.FloatField("Площадь торгового объекта на праве собственности", blank=True, null=True)
    trade_obj_law = models.FloatField("Площадь торгового объекта иное законное основание (аренда)", blank=True, null=True)

    def __str__(self):
        return f"Розница: {self.object.name}"


class SquareOpt(models.Model):
    object = models.ForeignKey(
        Object,
        on_delete=models.CASCADE,
        verbose_name="Торговый объект",
        related_name="square_opt"  # Удобно: object.square_opt.all()
    )

    warehouse_square = models.FloatField("Площадь складского помещения", blank=True, null=True)
    warehouse_vol = models.FloatField("Объем складского помещения", blank=True, null=True)
    tank = models.FloatField("Цистерна для хранения нефтепродуктов", blank=True, null=True)
    fridge_vol = models.FloatField("Объем холодильников", blank=True, null=True)
    fridge_weight = models.FloatField("Масса товаров в холодильниках", blank=True, null=True)
    def __str__(self):
        return f"Опт: {self.object.name}"

class SquareMeal(models.Model):
    object = models.ForeignKey(
        Object,
        on_delete=models.CASCADE,
        verbose_name="Объект",
        related_name="square_meal"  # Удобно: object.square_opt.all()
    )

    open_space = models.FloatField("Площадь зала", blank=True, null=True)
    people_space = models.FloatField("Количество посадочных мест", blank=True, null=True)


class SquareServices(models.Model):
    object = models.ForeignKey(
        Object,
        on_delete=models.CASCADE,
        verbose_name="Объект",
        related_name="square_services"  # Удобно: object.square_opt.all()
    )

    all_square = models.FloatField("Общая площадь", blank=True, null=True)
    work_square = models.FloatField("Рабочая площадь", blank=True, null=True)



class ActivityKind(models.Model):
    name = models.CharField("Название вида деятельности", max_length=255)

    class Meta:
        verbose_name = "Под вид деятельности"
        verbose_name_plural = "Под вид деятельности"

    def __str__(self):
        return self.name


class ObjectType(models.Model):
    name = models.CharField("Тип объекта", max_length=255)

    class Meta:
        verbose_name = "Тип объекта"
        verbose_name_plural = "Типы объектов"

    def __str__(self):
        return self.name


class SystemUser(models.Model):
    login = models.CharField("Логин", max_length=255, unique=True)
    password = models.CharField("Пароль", max_length=255)

    class Meta:
        verbose_name = "Системный пользователь"
        verbose_name_plural = "Системные пользователи"

    def __str__(self):
        return self.login


class Rules(models.Model):
    can_create = models.BooleanField("Может создавать", default=False)
    can_update = models.BooleanField("Может обновлять", default=False)
    can_delete = models.BooleanField("Может удалять", default=False)
    id_user = models.ForeignKey(
        SystemUser,
        on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )

    class Meta:
        verbose_name = "Право доступа"
        verbose_name_plural = "Права доступа"

    def __str__(self):
        return f"Права для {self.id_user}"
