from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Album(models.Model):
    title = models.TextField()
###############################################################################
#                   SOLUTION ONE                                              # 
###############################################################################
    # images = models.ImageField(upload_to='images/')
###############################################################################

###############################################################################
#                   SOLUTION TWO MANUAL MODE  
#      images field will contain the list of location of images as a text                   
###############################################################################
    images = ArrayField(models.TextField())
###############################################################################


    def __str__(self):
        return self.title        