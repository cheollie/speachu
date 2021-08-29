# COMMANDS THAT WE'RE USING
# mysp.pace(p, c) - pace
# mysp.tone(p, c) - tone
# mysp.fillers(file) - filler count
# mysp.outlength(file) - length in hrs, minutes, seconds

import math
import speech_recognition as sr
import parselmouth
from parselmouth.praat import call, run_file
import glob
import pandas as pd
import numpy as np
import scipy
from scipy.io import wavfile
from scipy.stats import binom
from scipy.stats import ks_2samp
from scipy.stats import ttest_ind
import os


# initialize the recognizer
r = sr.Recognizer()

def outlength(file):
    sample_rate, data = wavfile.read(file)
    len_data = len(data)

    t = int(len_data / sample_rate)

    hours = t // 3600  # calculate in hours
    t %= 3600
    mins = t // 60  # calculate in minutes
    t %= 60
    seconds = t  # calculate in seconds

    return hours, mins, seconds


def fillers(filename):
    fillerCount = 0
    with sr.AudioFile(filename) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        text = r.recognize_google(audio_data)
        full = text.split()
        for x in full:
            if  x == "basically" or x == "uh" or x == "um" or x == "er":
                fillerCount+=1

    if fillerCount == 0:
        return "10"
    elif fillerCount < 2:
        return "9"
    elif fillerCount < 4:
        return "8"
    elif fillerCount < 6:
        return "7"
    elif fillerCount < 8:
        return "6"
    elif fillerCount < 10:
        return "5"
    elif fillerCount < 12:
        return "4"
    elif fillerCount < 14:
        return "3"
    elif fillerCount < 16:
        return "2"
    elif fillerCount >= 16:
        return "1"


def pace(m,p):
    sound=p+"/"+m+".wav"
    sourcerun=p+"/myspsolution.praat"
    path=p+"/"
    try:
        objects= run_file(sourcerun, -20, 2, 0.3, "yes",sound,path, 80, 400, 0.01, capture_output=True)
        z1=str( objects[1]) # This will print the info from the textgrid object, and objects[1] is a parselmouth.Data object with a TextGrid inside
        z2=z1.strip().split()
        z3=int(z2[3]) # will be the integer number 10
        z4=float(z2[3]) # will be the floating point number 8.3
        if z3==5:
            return "10"
        elif z3==4:
            return "8 slow"
        elif z3==3:
            return "6 slow"
        elif z3==2:
            return "3 slow"
        elif z3<=1:
            return "1 slow"
        elif z3==6:
            return "6 fast"
        elif z3==7:
            return "3 fast"
        elif z3>=8:
            return "1 fast"
    except Exception as e:
        print (e)
    return;


def tone(m,p):
    sound=p+"/"+m+".wav"
    sourcerun=p+"/myspsolution.praat" 
    path=p+"/"
    try:
        objects= run_file(sourcerun, -20, 2, 0.3, "yes",sound,path, 80, 400, 0.01, capture_output=True)
        z1=str( objects[1]) # This will print the info from the textgrid object, and objects[1] is a parselmouth.Data object with a TextGrid inside
        z2=z1.strip().split()
        z3=float(z2[8]) # will be the integer number 10
        z4=float(z2[7]) # will be the floating point number 8.3
        if z4<=114:
            g=101
            j=3.4
        elif z4>114 and z4<=135:
            g=128
            j=4.35
        elif z4>135 and z4<=163:
            g=142
            j=4.85
        elif z4>163 and z4<=197:
            g=182
            j=2.7
        elif z4>197 and z4<=226:
            g=213
            j=4.5
        elif z4>226:
            g=239
            j=5.3
        else:
            print("Voice not recognized")
            exit()
        def teset(a,b,c,d):
            d1=np.random.wald(a, 1, 1000)
            d2=np.random.wald(b,1,1000)
            d3=ks_2samp(d1, d2)
            c1=np.random.normal(a,c,1000)
            c2=np.random.normal(b,d,1000)
            c3=ttest_ind(c1,c2)
            y=([d3[0],d3[1],abs(c3[0]),c3[1]])
            return y
        nn=0
        mm=teset(g,j,z4,z3)
        while (mm[3]>0.05 and mm[0]>0.04 or nn<5):
            mm=teset(g,j,z4,z3)
            nn=nn+1
        nnn=nn
        if mm[3]<=0.09:
            mmm=mm[3]
        else:
            mmm=0.35
        if z4>97 and z4<=163:
            if z4<104.6:
                return "1"
            elif z4<111.2:
                return "2"
            elif z4<117.8:
                return "3"
            elif z4<124.4:
                return "4"
            elif z4<131:
                return "5"
            elif z4<137.6:
                return "6"
            elif z4<144.2:
                return "7"
            elif z4<150.8:
                return "8"
            elif z4<157.4:
                return "9"
            elif z4<164:
                return "10"
            else:
                return "Voice not recognized"
    except Exception as e:
        print (e)
    return;
