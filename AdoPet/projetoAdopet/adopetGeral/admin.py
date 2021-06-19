from django.contrib import admin
from .models import  AnuncioAnimal, Blog, ComentarioBlog, Pessoa, FotosAnuncio
from  nested_inline.admin import NestedTabularInline, NestedModelAdmin
from django.conf.urls.static import static
from django.conf import settings 

#Incluir um model junto com o outro dentro do django admin, utilizando o "nested_inline"
class FotosAnuncioInline(NestedTabularInline):
    model = FotosAnuncio
    extra = 0

class AnuncioAdmin(NestedModelAdmin):
    inlines = [FotosAnuncioInline]

    class Meta:
        model= FotosAnuncio

class ComentarioBlogInline(NestedTabularInline):
    model = ComentarioBlog
    extra = 0

class BlogAdmin(NestedModelAdmin):
    inlines = [ComentarioBlogInline]

    class Meta:
        model = ComentarioBlog

#Registrar no admin do django nossos models
admin.site.register(AnuncioAnimal, AnuncioAdmin)
admin.site.register(Pessoa)
admin.site.register(FotosAnuncio)
admin.site.register(Blog, BlogAdmin)
