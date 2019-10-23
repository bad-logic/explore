from django.urls import path, include
from .views import display_home, post, postView


urlpatterns = [
    path('', display_home,name='Home'),
    path('create-album/', postView, name='add_album'),
    path('post/', post , name='post')
]
