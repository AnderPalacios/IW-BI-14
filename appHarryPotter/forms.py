from django import forms
from .models import Criatura, Raza
from django.core.exceptions import ValidationError


class CriaturaForm(forms.ModelForm):
    class Meta:
        model = Criatura
        fields = ['nombre', 'descripcion', 'tamano', 'raza', 'categorias_peligro']  
        widgets = {
            'categorias_peligro': forms.CheckboxSelectMultiple,
            'raza': forms.Select(),
        }

class RazaForm(forms.ModelForm):
    class Meta:
        model = Raza
        fields = ['nombre', 'descripcion', 'habitat', 'inteligencia']
        widgets = {
            'nombre': forms.TextInput(attrs={'required': True}),
            'descripcion': forms.Textarea(attrs={'rows': 3, 'required': True}),
            'habitat': forms.Textarea(attrs={'rows': 2, 'required': True}),
            'inteligencia': forms.NumberInput(attrs={'min': 1, 'max': 10, 'required': True}),
        }