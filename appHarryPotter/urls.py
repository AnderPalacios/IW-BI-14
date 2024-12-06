from django.urls import path
from . import views

# Definimos las rutas para que soporten las traducciones
urlpatterns = [
 path('', views.IndexView.as_view(), name='index'),
 path('appHarryPotter/categorias', views.CategoriasListView.as_view(), name="categorias"),
 path('appHarryPotter/categorias/<int:pk>/criaturas/', views.CriaturasPorCategoriaView.as_view(), name='criaturas_por_categoria'),
 path('appHarryPotter/razas', views.RazasListView.as_view(), name="razas"),
 path('appHarryPotter/razas/<int:pk>/criaturas/', views.CriaturasPorRazaView.as_view(), name='criaturas_por_raza'),
 path('appHarryPotter/criaturas', views.CriaturasListView.as_view(), name="criaturas"),
 path('appHarryPotter/criatura/<int:pk>/', views.CriaturaDetailView.as_view(), name='criatura'),
 path('appHarryPotter/formulario/', views.formularios, name='formulario')
]
