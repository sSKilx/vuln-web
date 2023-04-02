# Vuln-Web - A Vulnerability Listing CRUD w/ REST API
# Made by: Vincent LeBlanc & Tyler Bosse

# --- DEPENDENCIES ---
from flask import Flask, request
from flask_restful import Resource, Api
from pony import orm
from flask_cors import CORS

app = Flask("__name__")
api = Api(app)
db = orm.Database()
CORS(app)

# --- CREATE DATABASE INSTANCE (w/ PonyORM) ---
class VulnerabilityDB(db.Entity):
    vuln_cve = orm.Required(str, unique=True)
    vuln_type = orm.Required(str)
    vuln_severity = orm.Required(float)
    vuln_description = orm.Required(str)

db.bind(provider="sqlite", filename="database.sqlite", create_db=True)
db.generate_mapping(create_tables=True)


# --- REST API ---
# GET VULNERABILITY [/]
class VulnerabilityList(Resource):
    def get(self):
        with orm.db_session:
            items = orm.select(v for v in VulnerabilityDB)
            vulns = [i.to_dict() for i in items]

        return {"Vulnerabilities": vulns}

# POST VULNERABILITY [/]
    def post(self):
        new_vuln = request.json

        try:
            with orm.db_session:
                VulnerabilityDB(
                    vuln_cve = new_vuln["vuln_cve"], 
                    vuln_type = new_vuln["vuln_type"],
                    vuln_severity = new_vuln["vuln_severity"],
                    vuln_description = new_vuln["vuln_description"]
                )
                return {"vulnerability": new_vuln}
        except orm.TransactionIntegrityError as err:
            print(err)
            return {"error": "CVE already exists!"} # Error Handling


# GET VULNERABILITY [/<string:vuln_cve>]
class VulnerabilityDetail(Resource):
    def get(self, vuln_cve):
        try:
            with orm.db_session:
                item = VulnerabilityDB.get(vuln_cve=vuln_cve)

            return {"vulnerability": item.to_dict()}
        except:
            return {"error": "CVE does not exist!"} # Error Handling
        

# PUT VULNERABILITY [/<string:vuln_cve>]
    def put(self, vuln_cve):
        try:
            with orm.db_session:
                item = VulnerabilityDB.get(vuln_cve=vuln_cve)

                if item is None:
                    return {"error": "CVE does not exist!"} # Error Handling

                data = request.json

                item.vuln_type = data.get("vuln_type", item.vuln_type)
                item.vuln_severity = data.get("vuln_severity", item.vuln_severity)
                item.vuln_description = data.get("vuln_description", item.vuln_description)

                return {"vulnerability": item.to_dict()}
        except:
            return {"error": "Error updating vulnerability!"} # Error Handling


# DELETE VULNERABILITY [/<string:vuln_cve>]
    def delete(self, vuln_cve):
        try:
            with orm.db_session:
                item = VulnerabilityDB.get(vuln_cve=vuln_cve)

                if item is None:
                    return {"error": "CVE does not exist!"} # Error Handling
                
                item.delete()

                return {"message": "Vulnerability deleted successfully!"}
        except:
            return {"error": "Error deleting vulnerability!"} # Error Handling


# --- ADDING ROUTES ---
api.add_resource(VulnerabilityList, "/")
api.add_resource(VulnerabilityDetail, "/<string:vuln_cve>")

if __name__ == '__main__':
    app.run(debug=True)
