from django import forms
from .models import Criatura
from django.core.exceptions import ValidationError


class CriaturaForm(forms.ModelForm):
    class Meta:
        model = Criatura
        fields = ['nombre', 'descripcion', 'tamano', 'raza', 'categorias_peligro']  
        widgets = {
            'categorias_peligro': forms.CheckboxSelectMultiple,
            'raza': forms.Select(),
        }