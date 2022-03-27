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
_json_pe = dict()
for paper_electronic in tikect_types["paper_electronic"]:
  _count_pe = 0
  for merchant in merchants:
    for ticket in merchant["ticket"]:
      if ticket == paper_electronic:
        _count_pe+=1
  _json_pe[paper_electronic] = str(_count_pe)
_json['paper_electronic'] = _json_pe

# private_common count
_json_pc = dict()
for private_common in tikect_types["private_common"]:
  _count_pc = 0
  for merchant in merchants:
    for ticket in merchant["ticket"]:
      if ticket == private_common:
        _count_pc+=1
  _json_pc[private_common] = str(_count_pc)
_json['private_common'] = _json_pc

# area count
_json_a = dict()
for area in areas:
  _count_a = 0
  for merchant in merchants:
    if area in merchant["address"]:
      _count_a+=1
  _json_a[area] = str(_count_a)
_json['area'] = _json_a

# category count
_json_c = dict()
for category in categorys:
  _count_c = 0
  for merchant in merchants:
    if category == merchant["category"]:
      _count_c+=1
  _json_c[category] = str(_count_c)
_json['category'] = _json_c

# write data
file_o = open('./data/summary_all.json', 'w', encoding='utf-8')
print(json.dumps(_json, ensure_ascii=False, indent=2), file=file_o)
file_o.close()