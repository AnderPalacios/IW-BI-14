from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class CategoriaPeligro(models.Model):
    nombre = models.CharField(max_length=50)
    # nivel de peligro del 1-4
    nivel_peligro = models.IntegerField(choices=[(1, 'Bajo'), (2, 'Medio'), (3, 'Alto'), (4, 'Mortal')], default=1)
    descripcion = models.CharField(max_length=300, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.nombre} (Nivel de peligro: {self.nivel_peligro}), descripción: {self.descripcion}"

class Raza(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(max_length=300, blank=True, null=True)
    habitat = models.CharField(max_length=100, blank=True, null=True)
    # Núnmero del 1-10
    inteligencia = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(10)]) 

    def __str__(self) -> str:
        return f"{self.nombre} (Inteligencia: {self.inteligencia}), descripción: {self.descripcion}"

class Criatura(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(max_length=300, blank=True, null=True)
    # Descripción del tamaño
    tamano = models.CharField(max_length=100)
    # Relaciones:
    # Campo para la relación many-to-many (una criatura puede aparecer en más de una categoría de peligro)
    categorias_peligro = models.ManyToManyField(CategoriaPeligro)
    # Campo para la relación one-to-many (una criatura pertenece a una única raza)
    raza = models.ForeignKey(Raza, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.nombre} (Tamaño: {self.tamano}, descripción: {self.descripcion}"

