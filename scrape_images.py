import urllib.request, re

urls = ['https://ginewusa.com', 'https://byellowtail.com', 'https://eighthgeneration.com', 'https://kirrikin.com']
print("Starting...")
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        print(f"--- {u} ---")
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']*\.(?:jpg|png|webp|jpeg)[^"\']*)["\']', html)
        valid_imgs = [i for i in imgs if 'logo' not in i.lower() and 'icon' not in i.lower()]
        for img in valid_imgs[:10]:
            if img.startswith('//'): print('https:' + img)
            elif img.startswith('/'): print(u + img)
            else: print(img)
    except Exception as e:
        print(f"Error for {u}: {e}")
