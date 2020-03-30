from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.contrib import messages
from django.conf import settings 
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import File
from .serializers import FileSerializer
import matplotlib.pyplot as plt
from django.http import JsonResponse
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.losses import CosineSimilarity
from tensorflow.keras.layers import LSTM, Dropout, Dense
from tensorflow.keras import optimizers, Sequential
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.preprocessing import MinMaxScaler
import os
from shutil import copyfile
from tensorflow.keras.applications import InceptionResNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Input
# from tensorflow.keras.models import Model, load_model
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense

from tensorflow.keras.preprocessing import image
from PIL import Image

def load_image(img_path, show=False):
    img = image.load_img(img_path, target_size=(224, 224, 3))
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.

    if show:
        plt.imshow(img_tensor[0])
        plt.axis('off')
        plt.show()

    return img_tensor


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        print('Post request...')
        
        # file_serializer = FileSerializer(data=request.data)
        print(request.data['myFile'])
        has_corona = False
        # temp = file_serializer.save()
        # print(temp)
        # print(os.getcwd())
        print(request.data['myFile'])
        
        gender = request.data['gender']
        age = request.data['age']
        file_name = str(settings.ID_TEST) + "_" + str(gender) + "_" + str(age) + "_" + str(request.data['myFile'])
        # print(gender)
        # print(age)
        img_path = request.data['myFile']
        im1 = Image.open(img_path)
        im1.save(settings.TESTED_LOC + file_name)
        settings.ID_TEST += 1
        # img = load_image(img_path)
        # gray_scaled_img = tf.image.rgb_to_grayscale(img)
        # data_to_3 = np.repeat(gray_scaled_img, 3, -1)
        # prob_threshhold = 0.6
        data = { 'hasCorona': has_corona, 'positiveProbabilty': 'test'}
      
        # val = settings.MODEL.predict(data_to_3)
        # print("Probabilty of Corona: ")
        # print(val[0][0])
        # print("Probabilty of not having Corona: ")
        # print(val[0][1])
        # positive_probabilty = "{:.2f}".format(round(val[0][0]*100.0, 2))
        # if prob_threshhold < val[0][0]:
        #     has_corona = True
        # data = {
        #     'hasCorona': has_corona,
        #     'positiveProbabilty': positive_probabilty 
        # }
        return JsonResponse(data)

class FileSubmitView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        print('Post request...')
        
        # file_serializer = FileSerializer(data=request.data)
        print(request.data['myFile'])
        has_corona = False
        # temp = file_serializer.save()
        # print(temp)
        print(os.getcwd())
        gender = request.data['gender']
        age = request.data['age']
        print(gender)
        print(age)
        img = load_image(request.data['myFile'])
        gray_scaled_img = tf.image.rgb_to_grayscale(img)
        data = { 'success': True}
        
        return JsonResponse(data)



