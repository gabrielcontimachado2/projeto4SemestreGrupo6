from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import AnuncioAnimal, Blog, FotosAnuncio, Pessoa
from django.http import HttpResponse

#Serializers para a API
#Serializer do usuario 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id','url', 'name']

#Serializer do blog da aplicação
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

#Serializer do foto do anuncio
class FotoAnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = FotosAnuncio
        fields = '__all__'     

#Serializer dos anuncios dentro da aplicação
class AnuncioSerializer(serializers.ModelSerializer):
    fotos = FotoAnuncioSerializer(many=True, read_only=False, required=False)   
    #Para realizer um post dentro da API e salvar os dados que vieram do viewset, no API REST    
    def post(data, fotos, *args, **kwargs):
      if data:
            instance = AnuncioAnimal.objects.create(nome=data['nome'], tipoAnimal=data['tipoAnimal'],
                                                    localizacao=data['localizacao'], raca=data['raca'],
                                                    porte=data['porte'], sexo=data['sexo'],
                                                    dataNascimento=data['dataNascimento'],personalidade=data['personalidade'],
                                                    observacoes=data['observacoes'], historia=data['historia'], fotoAnuncio=data['fotoAnuncio'], petName=data['petnome'])
            for foto in fotos:
                FotosAnuncio.objects.create(descricaoFoto=foto.name, anuncio=instance, foto=fotos)
            return instance

    class Meta:
        model = AnuncioAnimal
        fields = '__all__'

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        field = '__all__'
