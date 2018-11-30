from django.urls import path
from . import views


urlpatterns = [
        path('accounts/login',views.login,name='login'),
        path('accounts/signup',views.signup ,name='signup'),
        path('accounts/logout',views.logout,name='logout'),
]
