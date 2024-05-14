from django.shortcuts import render
from rest_framework import viewsets
from .models import Server, Category
from .serializer import ServerSerializer, CategorySerializer

from django.db.models import Count

from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import extend_schema

from .schema import server_list_docs, category_list_docs

class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()

    #@extend_schema(viewsets.ViewSet)
    @category_list_docs
    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):
    
    queryset = Server.objects.all()
    # permission_classes = [IsAuthenticated]
    
    @server_list_docs
    def list(self, request):
        
        """
    List servers based on optional query parameters.

    Args:
        request (rest_framework.request.Request): The request object.

    Raises:
        AuthenticationFailed: If the request requires authentication and the user is not authenticated.
        ValidationError: If there is an issue with the provided server ID or other validation errors.

    Returns:
        rest_framework.response.Response: A response containing serialized server data.

    Query Parameters:
        - category (str, optional): Filter results by category name.
        - qty (int, optional): Limit the number of results returned.
        - by_user (bool, optional): Filter results by the current authenticated user.
        - by_serverId (int, optional): Filter results by server ID.
        - with_num_members (bool, optional): Include the number of members in the results.

    Usage Example:
        To list servers in a specific category with a limit of 10 results:
        ```
        /api/servers/select?category=gaming&qty=10
        ```

    Note:
        - The `by_user` parameter requires authentication. If used without authentication, it raises AuthenticationFailed.
        - The `by_serverId` parameter is used to filter results by a specific server ID.
        - The `with_num_members` parameter, when set to true, includes the count of members in the serialized data.

    """
        
        category = request.query_params.get("category")
        
        qty = request.query_params.get("qty")
        
        by_user = request.query_params.get("by_user") == "true"
        
        by_serverId = request.query_params.get("by_serverId")
        
        with_num_members = request.query_params.get("with_num_members") == "true"
        
        # for filtering results based on category
        if category:
            self.queryset = self.queryset.filter(category__name=category)
            
        # for filtering results based on user    
        if by_user:
            if request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(members=user_id)
            else:
                raise AuthenticationFailed()
            
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members = Count("members"))
        
        # for filtering results based on numbers
        if qty:
            self.queryset = self.queryset[: int(qty)]
            
        if by_serverId:
            # if not request.user.is_authenticated:
            #     raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id = by_serverId)
                
                if not self.queryset.exists():
                    raise ValidationError(detail = f"Server with id {by_serverId} doesn't exist.")
            except ValueError:
                    raise ValidationError(detail = "Server Value Error.")
        
            
        serializer = ServerSerializer(self.queryset, many=True, context = {"num_members": with_num_members})
    
        return Response(serializer.data)