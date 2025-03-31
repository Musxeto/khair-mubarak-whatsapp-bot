from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Setup WebDriver
options = webdriver.FirefoxOptions()
options.add_argument("--profile=/home/mus/.mozilla/firefox/kecb9rer.default-release")

driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()), options=options)
driver.get("https://web.whatsapp.com/")

input("Scan the QR code and press Enter...")  # Wait for manual login

wait = WebDriverWait(driver, 20)

def has_unread_messages(chat_element):
    """Check if chat has unread messages"""
    try:
        chat_element.find_element(By.XPATH, ".//span[@aria-label='Unread messages']")
        return True
    except:
        return False

while True:
    try:
        # Wait for chat list to load
        wait.until(EC.presence_of_element_located((By.XPATH, "//div[@role='grid']")))
        
        # Find all chats with unread messages
        unread_chats = []
        all_chats = driver.find_elements(By.XPATH, "//div[@role='gridcell']")
        
        for chat in all_chats:
            if has_unread_messages(chat):
                unread_chats.append(chat)
        
        if not unread_chats:
            print("No unread chats found.")
            time.sleep(5)
            continue

        for chat in unread_chats:
            try:
                chat.click()  # Open chat
                time.sleep(2)  # Let messages load

                # Get last few messages (only incoming)
                messages = driver.find_elements(By.XPATH, "//div[contains(@class,'message-in')]")[-5:]  # Check last 5 messages

                # Check if any message contains "eid"
                should_reply = False
                for msg in messages:
                    try:
                        msg_text = msg.text.lower()
                        if "eid" in msg_text:
                            should_reply = True
                            break
                    except:
                        continue

                if should_reply:
                    # Find input box
                    input_box = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@title='Type a message']")))
                    input_box.click()
                    time.sleep(0.5)

                    # Type and send reply
                    input_box.send_keys("Khair Mubarak! 😊")
                    input_box.send_keys(Keys.ENTER)
                    print("Replied to Eid message")

                # Go back to chat list
                driver.find_element(By.XPATH, "//span[@data-icon='back']").click()
                time.sleep(1)

            except Exception as e:
                print(f"Error processing chat: {e}")
                # Try to go back if something went wrong
                try:
                    driver.find_element(By.XPATH, "//span[@data-icon='back']").click()
                except:
                    pass
                continue

        time.sleep(5)

    except Exception as e:
        print(f"Main loop error: {e}")
        driver.refresh()
        time.sleep(10)