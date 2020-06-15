from bs4 import BeautifulSoup
import requests
import urllib3
import json
import sys


def appid(tag):
    return tag.has_attr('data-ds-appid')

def noStyle(tag):
    return not tag.has_attr('style')


def main ():
    sales = []
    response = requests.get(f"https://store.steampowered.com/search/?specials=1&page=1")
    soup = BeautifulSoup(response.content,"lxml")

    pages = soup.find("div",class_="search_pagination_right").find_all("a")
    last = pages[len(pages)-2]['href']

    for p in range(2,int(last[last.find("page")+5:])):
        page = soup.find(id="search_resultsRows")
        anchors = page.find_all(appid)
        for x in anchors:
            sale = {}
            div = x.find("div", class_="col search_price_discount_combined responsive_secondrow")
            if (div.strike):
                sale[str(x['data-ds-appid'])] = {}
                if (div.find("br")):
                    sale[str(x['data-ds-appid'])]['price']= ''.join(div.find("br").next_siblings).strip()
                sale[str(x['data-ds-appid'])]['oldprice']= div.strike.text
                sale[str(x['data-ds-appid'])]['discount']= div.find(noStyle).span.text
                sales.append(sale)
        response = requests.get(f"https://store.steampowered.com/search/?specials=1&page={p}")
        soup = BeautifulSoup(response.content,"lxml")
        
    return sales

if __name__ == '__main__':
    x = main()
    print(json.dumps(x))
    sys.exit(0)