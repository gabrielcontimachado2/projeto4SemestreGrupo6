from django.contrib import admin
from .models import  AnuncioAnimal, Pessoa, FotosAnuncio
from  nested_inline.admin import NestedTabularInline, NestedModelAdmin
from django.conf.urls.static import static
from django.conf import settings 

class FotosAnuncioInline(NestedTabularInline):
    model = FotosAnuncio
    extra = 0

class AnuncioAdmin(NestedModelAdmin):
    inlines = [FotosAnuncioInline]

    class Meta:
        model= FotosAnuncio

admin.site.register(AnuncioAnimal, AnuncioAdmin)
admin.site.register(Pessoa)
admin.site.register(FotosAnuncio)
