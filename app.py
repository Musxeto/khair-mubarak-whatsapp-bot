from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.FirefoxOptions()
options.add_argument("--profile=/home/mus/.mozilla/firefox/kecb9rer.default-release")

driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()), options=options)
driver.get("https://web.whatsapp.com/")

input("Scan the QR code and press Enter...")

# Wait for the chat list to load
WebDriverWait(driver, 30).until(
    EC.presence_of_element_located((By.XPATH, "//div[@role='grid']"))
)

print("Logged in successfully!")
