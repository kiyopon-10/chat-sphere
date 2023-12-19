from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Server(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250, null=True)
    ownername = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='server_owner')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='server_category')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)
    
class Channel(models.Model):
    pass
