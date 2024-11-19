from django.contrib import admin
from .models import CategoriaPeligro, Raza, Criatura

# Register your models here.
admin.site.register(CategoriaPeligro)
admin.site.register(Raza)
admin.site.register(Criatura)