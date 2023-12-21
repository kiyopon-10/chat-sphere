from django.contrib import admin

# Register your models here.

from .models import Category, Server, Channel

admin.site.register(Category)
admin.site.register(Server)
admin.site.register(Channel)

