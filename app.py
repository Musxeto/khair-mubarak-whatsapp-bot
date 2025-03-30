from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager

options = webdriver.FirefoxOptions()
options.add_argument("--profile=/home/mus/.mozilla/firefox/kecb9rer.default-release")

driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()), options=options)
driver.get("https://web.whatsapp.com/")

input("Scan the QR code and press Enter...")
