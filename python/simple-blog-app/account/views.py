from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from blog.views import post_list


# Create your views here.


def signup(request):
    if request.method == 'POST':
        # the user wants to sign up
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(username = request.POST['username'])
                return render(request, 'accounts/signup.html',{'error': 'Username has already been taken!!!'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['username'], password = request.POST['password2'])
                auth.login(request, user)
                return redirect('post_list')
        else:
            return render(request, 'accounts/signup.html',{'error': 'Passwords must match!!!'})

    else:
        # user wants to goto signup page and enter info
        return render(request, 'accounts/signup.html')

def login(request):
    if request.method=='POST':
        #wants to login
        user = auth.authenticate(username=request.POST['username'],password=request.POST['password1'])
        if user is not None:
            auth.login(request, user)
            return redirect('post_list')
        else:
            return render(request,'accounts/login.html',{'error':'username or password is incorrect.'})
    else:
        #just wants to goto login page
        return render(request, 'accounts/login.html')

def logout(request):
        auth.logout(request)
        return redirect('post_list')
