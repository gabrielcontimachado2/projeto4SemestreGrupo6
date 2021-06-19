from os import name, stat
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken.models import Token
from adopetGeral import views
from django.conf.urls import url
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#Rotas criadas com as views para a API REST
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'AnuncioAnimal', views.AnuncioAnimalViewSet) 
router.register(r'Pessoa', views.PessoaViewSet) 
router.register(r'Blog', views.BlogViewSet) 


urlpatterns = [
    url('admin/', admin.site.urls),
    url('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(router.urls)),
    url('api-auth/', include('rest_framework.urls')),
    url('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
