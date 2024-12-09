"""
URL configuration for IW_BI_14 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from django.conf.urls.i18n import i18n_patterns
from django.views.generic.base import RedirectView

urlpatterns = [
    # Redirige la raíz del sitio a /appHarryPotter
    path('', RedirectView.as_view(url='/appHarryPotter', permanent=False)),  
    path('appHarryPotter/', include('appHarryPotter.urls')),  # Incluye las URLs de la app
    path("admin/", admin.site.urls),  # Admin
]

# urlpatterns += i18n_patterns(
#     path('', include('appHarryPotter.urls')),
# )