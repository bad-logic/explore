from django.shortcuts import render
from django.shortcuts import redirect
from django.core.files.storage import FileSystemStorage
from .models import Album

# Create your views here.

def display_home(request):
    titles = []
    display_dict = {}
    db_obj = Album
    albums = db_obj.objects.all()
###############################################################################
#                   SOLUTION ONE                                              # 
###############################################################################

    # for album in albums:
    #     print("album.title>>",album.title)
    #     print("url>>>",album.images)
    #     if (album.title not in titles):
    #         titles.append(album.title)
    # for title in titles:
    #     url_dict = []
    #     for album in albums:
    #         if(title == album.title):
    #             url_dict.append(album.images.url)
    #     display_dict[title] = url_dict
###############################################################################

###############################################################################
#                   SOLUTION TWO MANUAL MODE                                  # 
###############################################################################
    for album in albums:
        # print("album.title>>",album.title)
        # print("url>>>",album.images)
        display_dict[album.title] = album.images
###############################################################################

    print("dictionary generated>>>",display_dict)

    return render(request, 'files/home.html',{'display':display_dict})


def postView(request):
    return render(request, 'files/post.html')

def post(request):

###############################################################################
#                     SOLUTION ONE                                              
#       Here each received images will be stored as individual Album
#       with title and image field in the database                                                 
###############################################################################
    # title = request.POST.get('title')
    # for afile in request.FILES.getlist('files'):
    #     album = Album()
    #     album.title= title 
    #     album.images = afile
    #     album.save()
###############################################################################

###############################################################################
#                   SOLUTION TWO MANUAL MODE     
#     Here each received images name will be stored as a list of string of the 
#     album object in the database
###############################################################################

    # extracting the files from the req object
    files_req_obj = request.FILES.getlist('files')
    # files_req_obj contains the name and the image
    # extracting the image name for storing in the TextField of db
    image_names = []
    for files in files_req_obj:
        # adding media/images which is the location where images are stored
        # this will come in handy while loading images in frontend
        image_names.append('media/images/'+files.name)
    
    # manually save the images to /images folder 
    fs = FileSystemStorage()
    for image in files_req_obj:
        fs.save('images/'+image.name,image)#you can change filename here if you want 
        # append date time whatever just incase to avoid multiple files with same name 

    album = Album()
    # setting the title field of db with the title of the album
    album.title = request.POST.get('title')
    # setting the images field of db with the list of names of the images
    album.images = image_names
    album.save()
###############################################################################
    return redirect('/')