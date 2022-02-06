# open shop_raw.json
file_i = open('../data/raw_data.json', 'r')

# read and close file
data_b = file_i.read()
file_i.close()

# add "" to key
data_a = data_b.replace('id:','"id":')\
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

# open and print file
file_o = open('../data/formatted_data.json', 'w')
print(data_a, file=file_o)
file_o.close()

