from django.shortcuts import render
from rest_framework import viewsets
from .models import Server
from .serializer import ServerSerializer

from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed

class ServerListViewSet(viewsets.ViewSet):
    
    queryset = Server.objects.all()
    
    def list(self, request):
        category = request.query_params.get("category")
        
        qty = request.query_params.get("qty")
        
        by_user = request.query_params.get("by_user") == "true"
        
        by_serverId = request.query_params.get("by_serverId")
        
        if by_user or by_serverId and not request.user.is_authenticated:
            raise AuthenticationFailed()
        
        # for filtering results based on category
        if category:
            self.queryset = self.queryset.filter(category__name=category)
            
        # for filtering results based on user    
        if by_user:
            user_id = request.user.id 
            self.queryset = self.queryset.filter(members = user_id)
        
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
        
            
        serializer = ServerSerializer(self.queryset, many=True)
    
        return Response(serializer.data)