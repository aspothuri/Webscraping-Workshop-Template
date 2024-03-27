#pip install seleneium webdriver_manager

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common import TimeoutException
import sys
import time

options = Options()
options.add_argument('--headless')  # Run Chrome in headless mode

# Initialize Chrome driver
driver = webdriver.Chrome(
    service=ChromeService(ChromeDriverManager().install()),
    options=options
)

if len(sys.argv) <= 1:
    print('Ticker symbol CLI argument missing!')
    sys.exit(2)

ticker_symbol = sys.argv[1]

url = f'https://finance.yahoo.com/quote/{ticker_symbol}'

driver.set_window_size(1920, 1080)
driver.get(url)

# Wait for the page to load completely
time.sleep(5)  # Adjust the sleep time as needed

# Scrape the current price
current_price = driver\
    .find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="regularMarketPrice"]')\
    .text
print(f"Current price of {ticker_symbol}: {current_price}")

# Other scraping stuff can be added here

driver.quit()
