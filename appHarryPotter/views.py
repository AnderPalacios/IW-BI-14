from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import CategoriaPeligro, Raza, Criatura
from .forms import CriaturaForm, RazaForm
from django.views.generic import DetailView, ListView, TemplateView
from django.http import HttpResponse
from django.utils.translation import activate
from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse # Para devolver un JSON

# Las vistas antiguas utilizaban shortcuts 404, ahora con vistas basadas en clases no es necesario.
# Create your views here.
# def index(request):
#     # Aquí pasarle al index.html las razas y que pille una de ellas
#     criaturas_filtradas1 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (1, 2, 6) ORDER BY id DESC) GROUP BY raza_id ')
#     criaturas_filtradas2 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (4, 5, 7) ORDER BY id ASC) GROUP BY raza_id ')
#     # Fénix entre las aves mágicas
#     criaturas_filtradas3 = Criatura.objects.raw('SELECT * FROM appHarryPotter_Criatura WHERE raza_id = 3 AND nombre = "Fénix"')
#     criaturas_filtradas = list(criaturas_filtradas1) + list(criaturas_filtradas2) + list(criaturas_filtradas3)
#     criaturas_filtradas = sorted(criaturas_filtradas, key=lambda criatura: criatura.raza.id)
#     return render(request, 'index.html', {'lista_criaturas': criaturas_filtradas})
class IndexView(TemplateView): # TemplateView porque hacemos consultas específicas. No trabajamos especificamente con un modelo
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        # Consultas raw
        criaturas_filtradas1 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (1, 2, 6) ORDER BY id DESC) GROUP BY raza_id ')
        criaturas_filtradas2 = Criatura.objects.raw('SELECT * FROM( SELECT * FROM appHarryPotter_Criatura WHERE raza_id IN (4, 5, 7) ORDER BY id ASC) GROUP BY raza_id ')
        criaturas_filtradas3 = Criatura.objects.raw('SELECT * FROM appHarryPotter_Criatura WHERE raza_id = 3 AND nombre = "Fénix"')

        criaturas_filtradas = list(criaturas_filtradas1) + list(criaturas_filtradas2) + list(criaturas_filtradas3)
        criaturas_filtradas = sorted(criaturas_filtradas, key=lambda criatura: criatura.raza.id)
        
        context['lista_criaturas'] = criaturas_filtradas
        return context


# def show_categorias(request):
#     categorias = get_list_or_404(CategoriaPeligro.objects.all())
#     return render(request, 'categorias.html', {'lista_categorias': categorias})
class CategoriasListView(ListView):
    model = CategoriaPeligro
    template_name = 'categorias.html'
    queryset = CategoriaPeligro.objects.all()
    context_object_name = 'lista_categorias'

# def criaturas_por_categoria(request, categoria_id):
#     # Recuperar la categoría de peligro específica
#     categoria = get_object_or_404(CategoriaPeligro, id=categoria_id)
#     # Recuperar las criaturas asociadas a esta categoría
#     criaturas = get_list_or_404(Criatura.objects.filter(categorias_peligro=categoria))

#     # Renderizar una plantilla con la información
#     return render(request, 'criaturas_por_categoria.html', {
#         'categoria': categoria,
#         'criaturas': criaturas
#     })
class CriaturasPorCategoriaView(DetailView):
    model = CategoriaPeligro
    template_name = 'criaturas_por_categoria.html'
    context_object_name = 'categoria'

    def get_context_data(self, **kwargs):
        # Voy a añadir al contexto (dict) una variable más
        context = super(CriaturasPorCategoriaView, self).get_context_data(**kwargs)
        context['criaturas'] = get_list_or_404(Criatura.objects.filter(categorias_peligro=self.object))
        return context


# def show_razas(request):
#     razas = get_list_or_404(Raza.objects.all())
#     return render(request, 'razas.html', {'lista_razas': razas})
class RazasListView(ListView):
    model = Raza
    template_name = 'razas.html'
    queryset = Raza.objects.all()
    context_object_name = 'lista_razas'



# def criaturas_por_raza(request, raza_id):
#     # Recuperar la raza específica
#     raza = get_object_or_404(Raza, id=raza_id)
    
#     # Recuperar las criaturas asociadas a esta raza
#     criaturas = get_list_or_404(Criatura.objects.filter(raza=raza))
    
#     # Renderizar una plantilla con la información
#     return render(request, 'criaturas_por_raza.html', {
#         'raza': raza,
#         'criaturas': criaturas
#     })
class CriaturasPorRazaView(DetailView):
    model = Raza
    template_name = 'criaturas_por_raza.html'
    context_object_name = 'raza'  # La raza será accesible como 'raza' en el template

    def get_context_data(self, **kwargs):
        context = super(CriaturasPorRazaView, self).get_context_data(**kwargs)
        criaturas = Criatura.objects.filter(raza=self.object)
        context['criaturas'] = criaturas
        return context



# def show_criaturas(request):
#     criaturas = get_list_or_404(Criatura.objects.all())
#     context = {'lista_criaturas': criaturas, 'lista_categorias': categorias}
#     return render(request, 'criaturas.html', context)
class CriaturasListView(ListView):
    model = Criatura
    template_name = 'criaturas.html'
    queryset = Criatura.objects.all()
    context_object_name = 'lista_criaturas'




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

# El otro formulario
def nueva_raza(request):
    if request.method == 'POST':
        form = RazaForm(request.POST)
        if form.is_valid():
            print("Formulario válido. Datos: ", form.cleaned_data)
            form.save()
            return redirect('index')  # Redirige a una página que muestre todas las razas
        else:
            print("Errores del formulario:", form.errors)  # Debugging
    else:
        form = RazaForm()

    return render(request, 'nueva_raza.html', {'form': form})



# def ver_criatura(request, criatura_id):
#     criatura = get_object_or_404(Criatura, pk=criatura_id)
#     return render(request, 'criatura.html', {'criatura': criatura})
class CriaturaDetailView(DetailView):
    model = Criatura
    template_name = 'criatura.html'

def set_language(request, lang_code):
    # Cambiar el idioma
    if lang_code in dict(settings.LANGUAGES):
        activate(lang_code)
        response = redirect(request.META.get('HTTP_REFERER', '/'))  # Redirigir a la página anterior
        response.set_cookie(settings.LANGUAGE_COOKIE_NAME, lang_code)  # Guarda el idioma en cookies
        return response
    return redirect('/')

def buscar_criaturas(request):
    query = request.GET.get('q', '')  
    criaturas = Criatura.objects.filter(nombre__icontains=query) 
    data = [
        {"id": c.id, "nombre": c.nombre, "descripcion": c.descripcion}
        for c in criaturas
    ]
    return JsonResponse(data, safe=False)