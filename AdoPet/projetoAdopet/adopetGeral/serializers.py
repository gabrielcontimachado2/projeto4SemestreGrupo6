from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import AnuncioAnimal, FotosAnuncio, Pessoa
from django.http import HttpResponse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id','url', 'name']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id','url', 'name']

class FotoAnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = FotosAnuncio
        fields = '__all__'     

class AnuncioSerializer(serializers.ModelSerializer):
    fotos = FotoAnuncioSerializer(many=True, read_only=False, required=False)       
    def post(data, fotos, *args, **kwargs):
      if data:
            instance = AnuncioAnimal.objects.create(nome=data['nome'], tipoAnimal=data['tipoAnimal'],
                                                    localizacao=data['localizacao'], raca=data['raca'],
                                                    porte=data['porte'], sexo=data['sexo'],
                                                    dataNascimento=data['dataNascimento'],personalidade=data['personalidade'],
                                                    observacoes=data['observacoes'], historia=data['historia'], fotoAnuncio=data['fotoAnuncio'])
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
