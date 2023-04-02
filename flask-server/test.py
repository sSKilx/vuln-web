import requests
import csv

with open("data.csv") as f:
    r = csv.reader(f)
    data = [row for row in r if row]

def post_data(item):
    headers = {"Content-Type": "application/json"}
    payload = {
        "vuln_cve": item[0],
        "vuln_type": item[1],
        "vuln_severity": item[2],
        "vuln_description": item[3]
    }
    response = requests.post("http://localhost:5000", headers=headers, json=payload)
    return response.json()

for item in data:
    print(post_data(item))