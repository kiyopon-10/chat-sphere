from rest_framework import serializers

from .models import Server, Channel, Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
    
class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"

class ServerSerializer(serializers.ModelSerializer):
    
    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)
    category = serializers.StringRelatedField()
    
    class Meta:
        model = Server
        exclude = ("members",)
        
    # this function is for taking care of the field num_members
    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get('num_members')
        
        if not num_members:
            data.pop("num_members")

        return data