import requests
import re

# get shop data
res = requests.get('https://saitama-premium-search.com/_nuxt/15e9a61.js')
raw_data = re.findall(r'206:function\(e,t\)\{e\.exports\=(.*)\},207:function\(e,t\)',res.text)

# write raw_data
raw_file = open('./data/raw_data.json', 'w')
print(raw_data[0], file=raw_file)
raw_file.close()

# format data
formatted_data = raw_data[0].replace('id:','"id":')\
    .replace('category:','"category":')\
    .replace('ticket:','"ticket":')\
    .replace('phone:','"phone":')\
    .replace('postal:','"postal":')\
    .replace('address:','"address":')\
    .replace('building:','"building":')\
    .replace('url:','"url":')\
    .replace('note:','"note":')\
    .replace('searchname:','"searchname":')\
    .replace('name:', '"name":')

# write formatted_data
formatted_file = open('./data/formatted_data.json', 'w')
print(formatted_data, file=formatted_file)
formatted_file.close()