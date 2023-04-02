# **Overview**
Vuln-Web is a simple page application that displays a basic list of vulnerabilities where you can CREATE, READ, UPDATE and DELETE data.
The Flask backend is also using a REST API.

**This project was created using:**
- [Flask (backend)](https://flask.palletsprojects.com/en/2.2.x/)
- [React (frontend)](https://github.com/facebook/create-react-app)
- [Bootstrap (frontend)](https://github.com/twbs/bootstrap)

# **Getting started with Vuln-Web**
# Installation
***RECOMMENDED***\
Use a virtual environement:
### `https://docs.python.org/3/library/venv.html`

Clone the repo using:
### `git clone https://github.com/sSKilx/vuln-web` 

Install required dependencies for the backend:
### `pip3 install -r requirements.txt`

# Other dependencies
***NOTE***\
Some dependencies must also be installed for the frontend in the `client` folder using `npm` (**make sure you have node.js installed**):

### `npm install react-router-dom`

### `npm install bootstrap`

# Startup
Open up a terminal and `cd` into the `flask-server` directory, use this command to start the Flask backend.
### `python3 main.py`

For the frontend, open up another terminal and `cd` into the `client` directory, use this command to start the React frontend:
### `npm start`

***NOTE***\
The database `"database.sqlite"` is automatically created in the backend. If you see no data in the database, use the `test.py` to insert the content of `data.csv`

# **Endpoints**
- **[GET]** http://localhost:5000/
- **[PUT]** http://localhost:5000/CVE-XXXX-XXXXX
- **[POST]** http://localhost:5000/
- **[DELETE]** http://localhost:5000/CVE-XXXX-XXXXX

***NOTE***\
See [Postman](#postman) section to test those endpoints.

# **Postman**
You can test if the services (CRUD) are working using [Postman](https://www.postman.com/downloads/), by importing: 
- `VulnWeb.postman_collection.json`

# **Issues**
- When editing a vulnerability listing, you need to fill in all the fields for it to edit properly.
