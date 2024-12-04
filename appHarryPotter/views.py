from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import CategoriaPeligro, Raza, Criatura
from .forms import CriaturaForm

from django.http import HttpResponse
# Create your views here.
def index(request):
    # Aquí pasarle al index.html las razas y que pille una de ellas
    criaturas_filtradas1 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (1, 2, 6) ORDER BY id DESC) GROUP BY raza_id ')
    criaturas_filtradas2 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (4, 5, 7) ORDER BY id ASC) GROUP BY raza_id ')
    # Fénix entre las aves mágicas
    criaturas_filtradas3 = Criatura.objects.raw('SELECT * FROM appHarryPotter_Criatura WHERE raza_id = 3 AND nombre = "Fénix"')
    criaturas_filtradas = list(criaturas_filtradas1) + list(criaturas_filtradas2) + list(criaturas_filtradas3)
    criaturas_filtradas = sorted(criaturas_filtradas, key=lambda criatura: criatura.raza.id)
    return render(request, 'index.html', {'lista_criaturas': criaturas_filtradas})


def show_categorias(request):
    categorias = get_list_or_404(CategoriaPeligro.objects.all())
    return render(request, 'categorias.html', {'lista_categorias': categorias})

def criaturas_por_categoria(request, categoria_id):
    # Recuperar la categoría de peligro específica
    categoria = get_object_or_404(CategoriaPeligro, id=categoria_id)
    # Recuperar las criaturas asociadas a esta categoría
    criaturas = get_list_or_404(Criatura.objects.filter(categorias_peligro=categoria))

    # Renderizar una plantilla con la información
    return render(request, 'criaturas_por_categoria.html', {
        'categoria': categoria,
        'criaturas': criaturas
    })

def show_razas(request):
    razas = get_list_or_404(Raza.objects.all())
    return render(request, 'razas.html', {'lista_razas': razas})

def criaturas_por_raza(request, raza_id):
    # Recuperar la raza específica
    raza = get_object_or_404(Raza, id=raza_id)
    
    # Recuperar las criaturas asociadas a esta raza
    criaturas = get_list_or_404(Criatura.objects.filter(raza=raza))
    
    # Renderizar una plantilla con la información
    return render(request, 'criaturas_por_raza.html', {
        'raza': raza,
        'criaturas': criaturas
    })


def show_criaturas(request):
    criaturas = get_list_or_404(Criatura.objects.all())
    categorias = get_list_or_404(CategoriaPeligro.objects.all())
    context = {'lista_criaturas': criaturas, 'lista_categorias': categorias}
    return render(request, 'criaturas.html', context)

def formularios(request):
    if request.method == 'POST':
        form = CriaturaForm(request.POST)
        if form.is_valid():
            print("Formulario válido. Datos:", form.cleaned_data)
            # Guarda la instancia principal de Criatura
            nueva_criatura = form.save(commit=True)  # Guarda directamente la instancia
            
            # Asigna las categorías de peligro manualmente
            categorias_peligro = form.cleaned_data.get('categorias_peligro')
            if categorias_peligro:
                nueva_criatura.categorias_peligro.set(categorias_peligro)  # Asignar las relaciones Many-to-Many

            return redirect('index')
        else:
            print("Errores del formulario:", form.errors)
    else:
        form = CriaturaForm()

    return render(request, 'formularios.html', {'form': form})




def ver_criatura(request, criatura_id):
    criatura = get_object_or_404(Criatura, pk=criatura_id)
    return render(request, 'criatura.html', {'criatura': criatura})

