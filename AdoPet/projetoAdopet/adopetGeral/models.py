from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model, ModelState
from django.db.models.fields import DateField, DateTimeCheckMixin, DateTimeField
from django.db.models.fields.files import ImageField
from datetime import date, datetime


#Local de upload para o album de fotos de um anuncio
def upload_location(instance, filename):
    extension = filename.split('.')[-1]
    return 'media/fotosAnuncios/', extension

#Model responsavel pelo anuncio de um animal
class AnuncioAnimal(models.Model):

    SEXO_OPCOES = (
        ('Macho', 'Macho'),
        ('Fêmea', 'Femea'),
    )

    TIPO_ANIMAL = (
        ('Gato', 'Gato'),
        ('Cachorro', 'Cachorro'),
    )

    PORTE_ANIMAL = (
        ('Pequeno', 'Pequeno'),
        ('Médio', 'Médio'),
        ('Grande', 'Grande'),
    )

    fotoAnuncio = ImageField(upload_to="media/fotoAnuncio", help_text = "Escolha uma imagem", blank=True, null=True)
    nome = models.CharField(max_length=50, help_text="Nome anuncio.")
    tipoAnimal = models.CharField(choices=TIPO_ANIMAL, default='Gato', help_text="Escolha o tipo do seu pet", max_length=8)
    localizacao = models.TextField(help_text="Localização do animal.")
    raca = models.CharField(max_length=100, help_text="Raça do animal")
    porte = models.CharField(choices=PORTE_ANIMAL, default='Pequeno', help_text="Escolha o sexo do animal", max_length=7)
    sexo = models.CharField(choices=SEXO_OPCOES, default='Macho', help_text="Escolha o sexo do animal", max_length=5)
    dataNascimento = models.DateField(help_text="dd/mm/aaaa")
    personalidade = models.TextField(help_text="Personalidade do pet.")
    observacoes = models.TextField(help_text="Observações do pet.")
    historia = models.TextField(help_text="Digite a historia do pet", null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def fotos(self):
        return FotosAnuncio.objects.filter(anuncio_id=self.id)

    def __str__(self):
        return self.nome

    class Meta:
        managed = True
        db_table = 'tab_anuncioAnimal'
        verbose_name_plural=u'Anuncios'

#Model ligado ao model de anuncio de animal, responsavel por fazer um album de fotos dentro do anuncio
class FotosAnuncio(models.Model):
    anuncio = models.ForeignKey(AnuncioAnimal, on_delete=models.CASCADE)
    foto = models.ImageField(upload_to="media/fotosAnuncio", verbose_name="Foto", help_text="Escolha a foto", blank=True)
    descricaoFoto = models.TextField(help_text="Descrição da foto")

    def __str__(self):
        return "%s - %s" % (self.anuncio.nome, self.descricaoFoto)

    class Meta:
        managed = True
        db_table = 'tab_fotosAnuncio'
        verbose_name_plural=u'Fotos dos anuncios'

#Model para o perfil da pessoa
class Pessoa(models.Model):

    GENERO_OPCOES = (
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('N/A','Prefiro não dizer')
    )
    nome = models.CharField(verbose_name="Nome", max_length=250, help_text="Nome completo")
    dataNascimento = models.DateField(verbose_name="Data de nascimento", help_text="dd/mm/aaaa")
    genero = models.CharField(choices=GENERO_OPCOES, default='M', verbose_name="Gênero", help_text="Escolha o gênero", max_length=3)
    avatar = models.ImageField(upload_to= "media/avatar", verbose_name="Avatar", help_text = "Escolha uma imagem", blank=True, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def idade(self):
        today = date.today() 
        return today.year - self.dataNascimento.year - ((today.month, today.day) < (self.dataNascimento.month, self.dataNascimento.day))

    def __str__(self):
        return self.nome

    class Meta:
        managed = True
        db_table = 'tab_Pessoa'
        verbose_name_plural=u'Pessoas'

#Model do blog da aplicação
class Blog(models.Model):

    titulo = models.CharField(verbose_name="Titulo", max_length=250, help_text="Digite o titulo da postagem")
    autor = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    capaPostagem = models.ImageField(upload_to= "media/fotoPostagem", blank=True, null=True)
    postagem = models.TextField(help_text="Digite sua postagem aqui")
    dataCriacao = models.DateField(verbose_name="Data criação", help_text="dd/mm/aaaa", null=True)
   
    def __str__(self):
        return self.titulo

    class Meta:
        managed = True
        db_table = 'tab_Blog'
        verbose_name_plural=u'Blogs'

#Model ligado ao blog, para salvar os comentarios realizados na postagem
class ComentarioBlog(models.Model):
    postagem = models.ForeignKey(Blog, on_delete=models.CASCADE)
    comentario = models.TextField(help_text="Digite seu comentario")
    autorComentario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        managed = True
        db_table = 'tab_ComentarioBlog'
        verbose_name_plural=u'Comentarios'