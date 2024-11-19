from django.urls import path
from . import views

urlpatterns = [
 path('', views.index, name='index'),
 path('categorias', views.show_categorias, name="categorias"),
 path('categorias/<int:categoria_id>/criaturas/', views.criaturas_por_categoria, name='criaturas_por_categoria'),
 path('razas', views.show_razas, name="razas"),
 path('razas/<int:raza_id>/criaturas/', views.criaturas_por_raza, name='criaturas_por_raza'),
 path('criaturas', views.show_criaturas, name="criaturas"),
 path('criatura/<int:criatura_id>/', views.ver_criatura, name='criatura'),
]