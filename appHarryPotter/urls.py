from django.urls import path
from django.conf.urls.i18n import i18n_patterns
from . import views

# De esta manera soporta el i18n para el muntilingüismo
urlpatterns = i18n_patterns(
 path('', views.index, name='index'),
 path('appHarryPotter/categorias', views.show_categorias, name="categorias"),
 path('appHarryPotter/categorias/<int:categoria_id>/criaturas/', views.criaturas_por_categoria, name='criaturas_por_categoria'),
 path('appHarryPotter/razas', views.show_razas, name="razas"),
 path('appHarryPotter/razas/<int:raza_id>/criaturas/', views.criaturas_por_raza, name='criaturas_por_raza'),
 path('appHarryPotter/criaturas', views.show_criaturas, name="criaturas"),
 path('appHarryPotter/criatura/<int:criatura_id>/', views.ver_criatura, name='criatura'),
]