from .views_importer import *

class UploadImageView(APIView):
    def post(self, request):
        raw_page_img_file = request.FILES['page_img_file']
        # Todo: upload to url in s3
        url_upload = s3_upload(raw_page_img_file)
        data = {
        	'url': url_upload
        }

        return Response(data=data, status=status.HTTP_201_CREATED)
