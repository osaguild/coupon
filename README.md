# coupon

### discription
Program to scrape "saitama-premium-search.com" to get store information

### Getting json data
 - Access https://saitama-premium-search.com/_nuxt/15e9a61.js in your browser
 - Manually trim the json data as shown below
``` data
[
    {
        id:"288781",
        category:"雑貨店",
        ticket:["共通券のみ","紙券"],
        phone:"048-856-7100",name:"【共通券】i-clockイオンモール与野店",
        postal:"338-0004",
        address:"埼玉県さいたま市中央区本町西5-2-9",
        building:"イオンモール与野3階",
        url:"",
        note:"",
        searchname:"I-CLOCKイオンモール与野店"
    },
    {
        ...
    }
]
```
 - Save the data as ./data/raw_data.json

### Create jsonl file for import
 - Run format.py for change for add "" to the keys
 - Run the command `jq -c '.[]' ./data/formatted_data.json > ./data/import_data.jsonl`

### Importing data into BigQuery
 - Open BigQuery console with GCP
 - Create a table by uploading file