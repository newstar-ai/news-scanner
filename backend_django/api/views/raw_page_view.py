from .views_importer import *

from ..serializers import RawPageSerializer
from ..models import RawPageData

class RawPageDataDetail(APIView):
    def get(self, request, pk, format=None):
        raw_page_data = get_object_or_404(RawPageData, id=pk)
        serializer = RawPageSerializer(raw_page_data)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        raw_page_data = get_object_or_404(RawPageData, id=pk)
        raw_page_data.delete()
        response_data = {
            'detail': 'Delete raw page data with id {pk}'
        }
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk):
        raw_page_data = get_object_or_404(RawPageData, id=pk)
        serializer = RawPageSerializer(raw_page_data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RawPageDataList(APIView):
    def get(self, request):
        valid_params = ('limit_page')
        # Check for valid param
        for k in request.GET.keys():
            if k not in valid_query_params:
                return Response(data={'detail': 'invalid query param.'}, 
                                status=status.HTTP_400_BAD_REQUEST)
        if 'limit_page' in request.GET:
            limit = int(request.GET['limit_page'])
            raw_page_data = RawPageData.objects.all()[:limit]
        else:
            raw_page_data = RawPageData.objects.all()

        '''Get non being handle data only'''
        raw_page_data.filter(Q(isActive=False))
        serializer = RawPageSerializer(raw_page_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = RawPageSerializer(data=request.data)

        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, 
                        status=status.HTTP_400_BAD_REQUEST)