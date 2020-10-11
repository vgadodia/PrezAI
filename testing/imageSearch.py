import requests

subscription_key = "670712e42f1940fd84207363f6ca988f"
search_url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

def main(search_term):
    params  = {"q": search_term, "license": "public", "imageType": "photo"}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:1]]

    ## FINAL URL OF IMAGE
    try:
        imageURL = thumbnail_urls[0]
        print(imageURL)
    except:
        print("Unable to retrieve any images.s")


sent = "artificial intelligence ai ability digital computer"
main(sent)