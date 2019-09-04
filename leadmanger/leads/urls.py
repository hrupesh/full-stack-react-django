from rest_framework import routers
from .api import LeadViewSet , TaskViewSet

router = routers.DefaultRouter()
router.register('api/leads',LeadViewSet , 'leads')
router.register('api/task',TaskViewSet , 'task')

urlpatterns = router.urls     
