import numpy as np
import cv2 
import re
import io
import sys
import base64
from PIL import Image
#import json
from sklearn.externals import joblib 

img_data = sys.argv[1]

def img_decode(data_uri):
    img_str = re.search(r'base64,(.*)', data_uri).group(1)
    img_bytes = io.BytesIO(base64.b64decode(img_str))
    im = Image.open(img_bytes)
    return im

def wrangle(img_data):
    im = img_decode(img_data)
    arr = np.array(im)[:,:,3]
    reduced = cv2.resize(arr,dsize=(28,28))
    reduced = reduced.reshape(1, 784)
    model_name = './ml_model/mnist_rf.pkl'
    forest_clf = joblib.load(model_name)
    result = forest_clf.predict(reduced)
    return result

print(wrangle(img_data))

    

