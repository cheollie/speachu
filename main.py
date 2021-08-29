mysp=__import__("my-voice-analysis")

p="" # add file name WITHOUT file type. E.g: if you have sample.wav, type sample
c=r"" # add file's directory

print("pace = " + mysp.pace(p, c))
print("tone = " + mysp.tone(p, c))
print("filler = " + mysp.fillers(p + ".wav"))
print("length (hrs, min, sec) = " + str(mysp.outlength(p + ".wav")))