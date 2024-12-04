from django.urls import path
from . import views

# Definimos las rutas para que soporten las traducciones
urlpatterns = [
 path('', views.index, name='index'),
 path('appHarryPotter/categorias', views.show_categorias, name="categorias"),
 path('appHarryPotter/categorias/<int:categoria_id>/criaturas/', views.criaturas_por_categoria, name='criaturas_por_categoria'),
 path('appHarryPotter/razas', views.show_razas, name="razas"),
 path('appHarryPotter/razas/<int:raza_id>/criaturas/', views.criaturas_por_raza, name='criaturas_por_raza'),
 path('appHarryPotter/criaturas', views.show_criaturas, name="criaturas"),
 path('appHarryPotter/criatura/<int:criatura_id>/', views.ver_criatura, name='criatura'),
]
