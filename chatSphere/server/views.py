from django.shortcuts import render
from rest_framework import viewsets
from .models import Server
from .serializer import ServerSerializer

from django.db.models import Count

from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed

class ServerListViewSet(viewsets.ViewSet):
    
    queryset = Server.objects.all()
    
    def list(self, request):
        category = request.query_params.get("category")
        
        qty = request.query_params.get("qty")
        
        by_user = request.query_params.get("by_user") == "true"
        
        by_serverId = request.query_params.get("by_serverId")
        
        with_num_members = request.query_params.get("with_num_members") == "true"
        
        if by_user or by_serverId and not request.user.is_authenticated:
            raise AuthenticationFailed()
        
        # for filtering results based on category
        if category:
            self.queryset = self.queryset.filter(category__name=category)
            
        # for filtering results based on user    
        if by_user:
            user_id = request.user.id 
            self.queryset = self.queryset.filter(members = user_id)
            
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members = Count("members"))
        
        # for filtering results based on numbers
        if qty:
            self.queryset = self.queryset[: int(qty)]
            
        if by_serverId:
            try:
                self.queryset = self.queryset.filter(id = by_serverId)
                
                if not self.queryset.exists():
                    raise ValidationError(detail = f"Server with id {by_serverId} doesn't exist.")
            except ValueError:
                    raise ValidationError(detail = "Server Value Error.")
        
            
        serializer = ServerSerializer(self.queryset, many=True, context = {"num_members": with_num_members})
    
        return Response(serializer.data)