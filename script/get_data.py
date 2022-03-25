import requests
import re
import json

# get merchant data
res = requests.get('https://saitama-premium-search.com/_nuxt/15e9a61.js')
_raw = re.findall(
    r'206:function\(e,t\)\{e\.exports\=(.*)\},207:function\(e,t\)', res.text)

# format data
_format = json.loads(
    _raw[0].replace('id:', '"id":')
    .replace('category:', '"category":')
    .replace('ticket:', '"ticket":')
    .replace('phone:', '"phone":')
    .replace('postal:', '"postal":')
    .replace('address:', '"address":')
    .replace('building:', '"building":')
    .replace('url:', '"url":')
    .replace('note:', '"note":')
    .replace('searchname:', '"searchname":')
    .replace('name:', '"name":')
)

# write merchant data
file_o = open('./data/merchant_data.json', 'w')
print(json.dumps(_format, indent=2), file=file_o)
file_o.close()
