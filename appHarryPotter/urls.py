from django.urls import path
from . import views

# Definimos las rutas para que soporten las traducciones
urlpatterns = [
 path('', views.IndexView.as_view(), name='index'),
 path('categorias', views.CategoriasListView.as_view(), name="categorias"),
 path('categorias/<int:pk>/criaturas/', views.CriaturasPorCategoriaView.as_view(), name='criaturas_por_categoria'),
 path('razas', views.RazasListView.as_view(), name="razas"),
 path('razas/<int:pk>/criaturas/', views.CriaturasPorRazaView.as_view(), name='criaturas_por_raza'),
 path('criaturas', views.CriaturasListView.as_view(), name="criaturas"),
 path('criatura/<int:pk>/', views.CriaturaDetailView.as_view(), name='criatura'),
 path('formulario/', views.formularios, name='formulario'),
 path('<str:lang_code>/', views.set_language, name='set_language'),
 path('nueva_raza/', views.nueva_raza, name='nueva_raza'),
 path('buscar-criaturas/', views.buscar_criaturas, name='buscar_criaturas'),
]
