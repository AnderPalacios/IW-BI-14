from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import CategoriaPeligro, Raza, Criatura

from django.http import HttpResponse
# Create your views here.
def index(request):
    return render(request, 'index.html')


def show_categorias(request):
    categorias = CategoriaPeligro.objects.all()
    return render(request, 'categorias.html', {'lista_categorias': categorias})

def criaturas_por_categoria(request, categoria_id):
    # Recuperar la categoría de peligro específica
    categoria = get_object_or_404(CategoriaPeligro, id=categoria_id)
    # Recuperar las criaturas asociadas a esta categoría
    criaturas = Criatura.objects.filter(categorias_peligro=categoria)

    # Renderizar una plantilla con la información
    return render(request, 'criaturas_por_categoria.html', {
        'categoria': categoria,
        'criaturas': criaturas
    })

def show_razas(request):
    razas = Raza.objects.all()
    return render(request, 'razas.html', {'lista_razas': razas})

def criaturas_por_raza(request, raza_id):
    # Recuperar la raza específica
    raza = get_object_or_404(Raza, id=raza_id)
    
    # Recuperar las criaturas asociadas a esta raza
    criaturas = Criatura.objects.filter(raza=raza)
    
    # Renderizar una plantilla con la información
    return render(request, 'criaturas_por_raza.html', {
        'raza': raza,
        'criaturas': criaturas
    })

def show_criaturas(request):
    criaturas = Criatura.objects.all()
    return render(request, 'criaturas.html', {'lista_criaturas': criaturas})

def ver_criatura(request, criatura_id):
    criatura = get_object_or_404(Criatura, pk=criatura_id)
    return render(request, 'criatura.html', {'criatura': criatura})
