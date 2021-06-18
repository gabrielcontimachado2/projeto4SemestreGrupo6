from django.contrib.auth.models import User, Group
from django.http.response import HttpResponse
from .serializers import GroupSerializer, PessoaSerializer, UserSerializer, AnuncioSerializer
from rest_framework import permissions, authentication, viewsets
from .models import AnuncioAnimal, FotosAnuncio, Pessoa

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
import json
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class AnuncioAnimalViewSet(viewsets.ModelViewSet):
    queryset = AnuncioAnimal.objects.all()
    serializer_class = AnuncioSerializer
    permissions_classes = (permissions.IsAuthenticated, )

    #def post(self, request, *args, **kwargs):
    #    fotos = []
    #    nome = request.data['nome']
    #    tipoAnimal=request.data['tipoAnimal']
    #    localizacao=request.data['localizacao']
    #    raca=request.data['raca']
    #    porte=request.data['porte']
    #    sexo=request.data['sexo']
    #    dataNascimento=request.data['dataNascimento']
    #    personalidade=request.data['personalidade']
    #    observacoes=request.data['observacoes']
    #    historia=request.data['historia']
    #    fotoAnuncio=request.data['fotoAnuncio']
    #    fotos = request.data['fotos']
    #    instance = AnuncioAnimal.objects.create(nome=nome, tipoAnimal=tipoAnimal, localizacao=localizacao, raca=raca, porte=porte, sexo=sexo,
    #                                dataNascimento=dataNascimento, personalidade=personalidade, observacoes=observacoes, historia=historia,
    #                                fotoAnuncio=fotoAnuncio)
    # 
    #    FotosAnuncio.objects.create(descricaoFoto=fotos.name, anuncio=nome, foto=fotos)
    #    return HttpResponse({'mensagem': 'Anuncio criado'}, status=200)

    def create(self, request,  *args, **kwargs):
        fotos = []
        try:     
            fotos = request.FILES.getlist('fotos')
            model = AnuncioSerializer.post(request.data, fotos)
            
            return JsonResponse({'codigo': 0, 'mensagem': 'Anuncio salvo com sucesso!!' })
        except:
           return JsonResponse({'codigo': 1, 'mensagem': 'Erro ao salvar, tente novamente!!' })

class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer




