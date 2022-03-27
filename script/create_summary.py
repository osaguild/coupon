import json

# read file
with open('./data/area.json', 'r', encoding='utf-8') as ra:
    areas = json.load(ra)
with open('./data/category.json', 'r', encoding='utf-8') as rc:
    categorys = json.load(rc)
with open('./data/merchant.json', 'r', encoding='utf-8') as rm:
    merchants = json.load(rm)
with open('./data/ticket_type.json', 'r', encoding='utf-8') as rt:
    tikect_types = json.load(rt)

_json = dict()

# all count
_json['all'] = str(len(merchants))

# paper_electronic count
_list = list()
for paper_electronic in tikect_types["paper_electronic"]:
  _count = 0
  for merchant in merchants:
    for ticket in merchant["ticket"]:
      if ticket == paper_electronic:
        _count+=1
  _list.append(dict(name=paper_electronic,count=str(_count)))
_json['paper_electronic'] = _list

# private_common count
_list = list()
for private_common in tikect_types["private_common"]:
  _count = 0
  for merchant in merchants:
    for ticket in merchant["ticket"]:
      if ticket == private_common:
        _count+=1
  _list.append(dict(name=private_common,count=str(_count)))
_json['private_common'] = _list

# area count
_list = list()
for area in areas:
  _count = 0
  for merchant in merchants:
    if area in merchant["address"]:
      _count+=1
  _list.append(dict(name=area,count=str(_count)))
_json['area'] = _list

# category count
_list = list()
for category in categorys:
  _count = 0
  for merchant in merchants:
    if category == merchant["category"]:
      _count+=1
  _list.append(dict(name=category,count=str(_count)))
_json['category'] = _list

# write data
file_o = open('./data/summary_all.json', 'w', encoding='utf-8')
print(json.dumps(_json, ensure_ascii=False, indent=2), file=file_o)
file_o.close()