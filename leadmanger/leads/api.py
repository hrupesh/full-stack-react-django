from leads.models import Lead , Task
from rest_framework import viewsets , permissions
from .serializers import LeadSerializer , TaskSerializer

class LeadViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = LeadSerializer
    
    def get_queryset(self):
        return self.request.user.leads.all()

    def  perform_create(self , serializer):
        serializer.save(owner = self.request.user)



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TaskSerializer
 