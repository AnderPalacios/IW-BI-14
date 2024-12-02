from django import forms
from .models import Criatura

class CriaturaForm(forms.ModelForm):
    class Meta:
        model = Criatura
        fields = ['nombre', 'descripcion', 'tamano', 'raza', 'categorias_peligro']  
        widgets = {
            'categorias_peligro': forms.CheckboxSelectMultiple,
            'raza': forms.Select(),
        }
