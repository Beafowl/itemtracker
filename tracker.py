import pyautogui
from PIL import Image, ImageEnhance, ImageOps
import pytesseract
import mouse
import time
import psycopg2
import schedule
from datetime import datetime

# include path for pytesseract lib

pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

def capture():

    # update 

    mouse.move("1710", "135")
    mouse.click()
    time.sleep(3)

    # take screenshot

    screenshot = pyautogui.screenshot(region=(1300, 220, 130, 30))
    screenshot.save("./screen.png")

    # enhance image by inverting and increasing contrast

    img = Image.open("screen.png")
    inverted_img = ImageOps.invert(img)
    ImageEnhance.Contrast(inverted_img).enhance(10).save("screen.png")

    # use google ocr api to convert image to string

    value = pytesseract.image_to_string("screen.png")
    value = value.replace(",", "")
    print(value)

    # include new entry to database

    con = psycopg2.connect(database="postgres", user="postgres",
    password="3wbn945Z6", host="127.0.0.1", port="5432")

    cur = con.cursor()
    cur.execute('insert into vollmondkristall (value) values({0})'.format(value))

    con.commit()
    con.close()
    print("New value captured (value:{0}) at {1}".format(value, datetime.now().strftime("%H:%M")))

def executeEveryHour():
    schedule.every().hour.do(capture)

executeEveryHour()