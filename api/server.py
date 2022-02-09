from re import M
from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

from numpy import empty

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


with open("database.json", "r") as database:
    json_data = json.load(database)


def loadData():
    global json_data
    with open("database.json", "r") as database:
        json_data = json.load(database)


def writeData():
    global json_data
    with open("database.json", "w") as databaseWrite:
        json.dump(json_data, databaseWrite, indent=4)


@app.route('/', methods=["GET", "POST", "PATCH"])
@cross_origin()
def apiRoute():
    if request.method == "GET":
        return json_data
    elif request.method == "POST":
        total = json_data["data"][-1]["memberId"]
        payload = request.get_json()
        newMember = {"memberId":  total+1}
        newMember.update(payload)
        newMember["squadId"] = int(newMember["squadId"])
        json_data["data"].append(newMember)
        writeData()
        loadData()
        return "200: Success"
    elif request.method == "PATCH":
        payload = request.get_json()
        member_i = False
        for i, member in enumerate(json_data["data"]):

            if int(member["memberId"]) == int(payload["memberId"]):
                member_i = i
        if member_i:
            # print(member_i)
            for attr, value in payload.items():
                json_data["data"][member_i][attr] = value
            # print(json_data["data"][member_i])
            writeData()
            loadData()
            return "200: Success"
        else:
            return "ERROR: User by that id doesnt exist"
    else:
        return "ERROR 405: WRONG METHOD, NOT ALLOWED"


if __name__ == '__main__':
    app.run()
