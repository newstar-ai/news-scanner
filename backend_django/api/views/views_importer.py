from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import generics

from utils.aws_utils import s3_upload
import sys
sys.path.append('../../')