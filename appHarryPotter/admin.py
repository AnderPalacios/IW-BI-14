from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Value
from django.db.models.functions import Concat
from .models import CategoriaPeligro, Raza, Criatura

# ---------------------------------------------------
# Configuración de CategoriaPeligro
# ---------------------------------------------------
class CategoriaPeligroAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'nivel_peligro_colored', 'descripcion')

    @admin.display(description="Nivel de Peligro")
    def nivel_peligro_colored(self, obj):
        color_map = {
            1: 'green',
            2: 'yellow',
            3: 'orange',
            4: 'red',
        }
        color = color_map.get(obj.nivel_peligro, 'black')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_nivel_peligro_display()
        )

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(nivel_peligro__lte=2)

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if not request.user.is_superuser:
            fields.remove('nivel_peligro')
        return fields


# ---------------------------------------------------
# Configuración de Raza
# ---------------------------------------------------
class RazaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'inteligencia', 'descripcion')

    @admin.display(description="Inteligencia (Estrellas)")
    def inteligencia_estrellas(self, obj):
        return '★' * obj.inteligencia

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.filter(inteligencia__gte=3)
        return queryset

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if not request.user.is_superuser:
            fields.remove('descripcion')
        return fields


# ---------------------------------------------------
# Configuración de Criatura
# ---------------------------------------------------
class CriaturaAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'raza', 'categorias_peligro_list')

    @admin.display(ordering=Concat('nombre', Value(' - '), 'tamano'))
    def nombre_completo(self, obj):
        return f"{obj.nombre} - {obj.tamano}"

    @admin.display(description="Categorías de Peligro")
    def categorias_peligro_list(self, obj):
        return ", ".join([categoria.nombre for categoria in obj.categorias_peligro.all()])

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.filter(raza__inteligencia__gte=3)
        return queryset

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        if obj and not request.user.is_superuser:
            return False
        return True


# ---------------------------------------------------
# Registro de los modelos en el admin
# ---------------------------------------------------
admin.site.register(CategoriaPeligro, CategoriaPeligroAdmin)
admin.site.register(Raza, RazaAdmin)
admin.site.register(Criatura, CriaturaAdmin)
