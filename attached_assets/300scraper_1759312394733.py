import requests
from bs4 import BeautifulSoup
import json
import time
import re
import sys
import random
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

BASE_URL = "https://stockanalysis.com"
LIST_URL = f"{BASE_URL}/list/pakistan-stock-exchange"

# Rotate different browser user agents
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0"
]

# Create session with retry
session = requests.Session()
retries = Retry(total=5, backoff_factor=2, status_forcelist=[429, 500, 502, 503, 504])
session.mount("https://", HTTPAdapter(max_retries=retries))


# =============== HELPERS ===============

def clean_number(text):
    if not text or text == '-' or text == 'N/A':
        return None
    cleaned = re.sub(r'[^\d.-]', '', str(text))
    try:
        return float(cleaned) if cleaned else None
    except ValueError:
        return None

def parse_market_cap(text):
    if not text:
        return None
    match = re.match(r'([\d,.]+)\s*([BMK]?)', str(text).strip())
    if not match:
        return text
    number_str, suffix = match.groups()
    number = clean_number(number_str.replace(',', ''))
    if number is None:
        return text
    if suffix == 'B':
        return f"{number}B"
    elif suffix == 'M':
        return f"{number}M"
    elif suffix == 'K':
        return f"{number}K"
    else:
        return f"{number}"


def fetch_url(url):
    """Fetch URL with retry, random headers, and error handling"""
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        response = session.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return response
    except requests.exceptions.RequestException as e:
        print(f"✗ Request failed for {url}: {e}")
        return None


# =============== SCRAPER FUNCTIONS ===============

def scrape_psx_list():
    print("🔎 Scraping PSX Top 300 list...")
    response = fetch_url(LIST_URL)
    if not response:
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"id": "main-table"})
    if not table:
        print("✗ Could not find main table on the page.")
        return []

    rows = table.find("tbody").find_all("tr")[:300]  # limit to 300 rows
    print(f"✓ Found {len(rows)} stocks in list (capped at 300)")

    symbols = []
    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 2:
            continue
        symbols.append(cols[1].text.strip())
    return symbols


def scrape_ratios(symbol):
    ratio_url = f"{BASE_URL}/quote/psx/{symbol.lower()}/financials/ratios"
    ratios = {}
    response = fetch_url(ratio_url)
    if not response:
        return ratios

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"id": "main-table"})
    if table:
        headers = [th.get_text(strip=True) for th in table.find("thead").find_all("th")]
        for row in table.find("tbody").find_all("tr"):
            cols = [td.get_text(strip=True) for td in row.find_all("td")]
            if cols:
                metric = cols[0]
                values = cols[1:]
                ratios[metric] = dict(zip(headers[1:], values))
    return ratios


def scrape_stock_details(symbol):
    stock_url = f"{BASE_URL}/quote/psx/{symbol.lower()}/"
    print(f"  → Scraping {symbol} ...")

    response = fetch_url(stock_url)
    if not response:
        return None

    soup = BeautifulSoup(response.content, "html.parser")

    name = soup.find("h1")
    name = name.text.strip() if name else symbol

    price_elem = soup.find("div", class_="text-4xl")
    price = clean_number(price_elem.text) if price_elem else None

    change = None
    change_percent = None
    change_elem = soup.find("div", class_="font-semibold")
    if change_elem:
        match = re.match(r"([+-]?\d+\.?\d*)\s*\(([-+]?\d+\.?\d*)%\)", change_elem.text.strip())
        if match:
            change = clean_number(match.group(1))
            change_percent = clean_number(match.group(2))

    stats = {}
    tables = soup.find_all("table")
    for table in tables:
        rows = table.find_all("tr")
        for row in rows:
            cols = row.find_all("td")
            if len(cols) == 2:
                key = cols[0].text.strip()
                val = cols[1].text.strip()
                stats[key] = val

    market_cap = parse_market_cap(stats.get('Market Cap'))
    pe_ratio = clean_number(stats.get('PE Ratio'))
    pb_ratio = clean_number(stats.get('PB Ratio'))
    eps = clean_number(stats.get('EPS'))
    dividend_yield = clean_number(stats.get('Dividend Yield', '').replace('%', '')) if stats.get('Dividend Yield') else None
    volume = clean_number(stats.get('Volume'))
    week52_high = clean_number(stats.get('52W High'))
    week52_low = clean_number(stats.get('52W Low'))

    week52_perf = None
    if week52_high and week52_low and price:
        try:
            week52_perf = round(((price - week52_low) / (week52_high - week52_low)) * 100, 2)
        except ZeroDivisionError:
            week52_perf = None

    ratios = scrape_ratios(symbol)

    return {
        "symbol": symbol.upper(),
        "name": name,
        "price": price,
        "change": change,
        "changePercent": change_percent,
        "volume": volume,
        "marketCap": market_cap,
        "peRatio": pe_ratio,
        "pbRatio": pb_ratio,
        "eps": eps,
        "dividendYield": dividend_yield,
        "week52High": week52_high,
        "week52Low": week52_low,
        "week52Performance": week52_perf,
        "ratios": ratios
    }


# =============== MAIN RUNNER ===============

def main():
    print("🚀 Starting PSX 300 detailed scraper...\n")
    stock_symbols = scrape_psx_list()
    if not stock_symbols:
        print("✗ No symbols found, exiting.")
        sys.exit(1)

    all_data = []
    for i, symbol in enumerate(stock_symbols, 1):
        details = scrape_stock_details(symbol)
        if details:
            all_data.append(details)
            print(f"    ✓ {symbol} scraped ({i}/{len(stock_symbols)})")
        else:
            print(f"    ✗ Failed to scrape {symbol}")

        # Randomized sleep to avoid 429 blocks
        time.sleep(random.uniform(2, 6))

    output_file = "psx_top300.json"
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(all_data, f, indent=2, ensure_ascii=False)
        print(f"\n✅ Scraping completed for {len(all_data)} stocks")
        print(f"📂 Data saved to {output_file}")
    except Exception as e:
        print(f"✗ Error saving data: {e}")


if __name__ == "__main__":
    main()
