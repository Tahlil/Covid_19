from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.contrib import messages
from django.conf import settings 
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import os 
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
from skimage.io import imsave, imread
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
import base64
import csv
import time;

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

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
        # print(request.data['myFile'])
        has_corona = False
        print(get_client_ip(request))
        ts = time.time()
        ip = get_client_ip(request)
        # temp = file_serializer.save()
        # print(temp)
        # print(os.getcwd())
        # print(request.data['myFile'])
        # gender = request.data['gender']
        # age = request.data['age']
        # file_name = str(settings.ID_TEST) + "_" + str(gender) + "_" + str(age) + "_" + str(request.data['myFile'])
        file_name = str(settings.ID_TEST) + str(request.data['myFile'])
        with open(settings.TESTED_LOC_CSV, 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([ts, ip, file_name])
        # print(gender)
        # print(age)
        img_path = request.data['myFile']    
        settings.ID_TEST += 1
        img = imread(img_path, as_gray = True) 
        imsave(settings.TESTED_LOC+file_name, img)
        # im1 = load_image("C:/Users/Du/Downloads/server/"+file_name)
        # prob_threshhold = 0.6
        # data = { 'hasCorona': has_corona, 'positiveProbabilty': 'test'}
        # val = settings.MODEL.predict(im1)
        # print("Probabilty of Corona: ")
        # print(val[0][0])
        # print("Probabilty of not having Corona: ")
        # print(val[0][1])
        # val[0][0] = min(val[0][0], 0.95)
        # if prob_threshhold < val[0][0]:
        #     file_name = settings.TESTED_LOC_POSITIVE + file_name
        #     has_corona = True
        # else:
        #     file_name = settings.TESTED_LOC_NEGATIVE + file_name
        # imsave(file_name, img)
        # positive_probabilty = "{:.2f}".format(round(val[0][0]*100.0, 2))
        data = {
            'hasCorona': has_corona,
            'positiveProbabilty': "testing" 
        }
        return JsonResponse(data)

class FileSubmitView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
        print('Submit data...')
        gender = request.data['gender']
        age = request.data['age']
        hasCorona = request.data['hasCorona']
        history = request.data['history']
        emailOrPhone = request.data['emailOrPhone']
        relation = request.data['relation']
        folder_name = str(settings.ID_SUBMIT) + "_" + str(emailOrPhone) + "___" + str(relation) 
        file_name = str(settings.ID_SUBMIT) + "_" + str(gender) + "_" + str(age) + "_" + str(request.data['myFile'])
        settings.ID_SUBMIT += 1
        if hasCorona:
            folder = settings.SUBMIT_LOC_POSITIVE
        else:
            folder = settings.SUBMIT_LOC_NEGATIVEe
        data = { 'success': True}
        img_path = request.data['myFile']
        img = imread(img_path, as_gray = True) 
        path = folder+'/'+folder_name
        os.mkdir(path) 
        imsave(path+'/'+file_name, img)
        if history != '':
            name_of_the_file, _ = os.path.splitext(str(request.data['myFile'])) 
            with open(path+'/'+name_of_the_file + ".txt", "w") as text_file:
                text_file.write(str(history))
        return JsonResponse(data)



