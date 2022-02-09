class InterfaceMember {
    constructor() {
        this.url = "https://tribe.api.fdnd.nl/v1/member";
        this.members = [];
        this.fetch();
    }

    async fetch() {
        const req = await fetch(this.url);
        await req
            .json()
            .then((res) => (this.members = res.data))
            .catch((e) => console.log(`%c${e}`, "color: red"));
    }

    async getUserById(id) {
        return await new Promise((resolve, reject) => {
            if (this.members) {
                this.members.filter((m) => {
                    if (m.memberId == id) {
                        // console.log(`exists ${JSON.stringify(m)}`);
                        resolve(m);
                    }
                });
                reject("Id doesnt exist");
            }
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(`%c${err}`, "color: red");
            });
    }

    async patch(data) {
        await this.fetch();
        const memberData = await this.getUserById(data.memberId);
        // console.log(memberData);
        if (memberData) {
            // console.log("member exists");
            for (let d in data) {
                if (Object.prototype.hasOwnProperty.call(data, d)) {
                    // replace values
                    // console.log(`changed ${memberData[d]} to ${data[d]} `);
                    memberData[d] = data[d];
                }
            }
            console.log("patching with new data", data);
            const xhr = new XMLHttpRequest();
            xhr.open("PATCH", this.url);

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                }
            };
            // console.log(`Sending request `);

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    console.log(
                        `%cError ${xhr.status}: ${xhr.statusText}`,
                        "color: red"
                    );
                } else {
                    console.log(`%c${xhr.response}`, "color: green");
                }
            };

            xhr.send(data);
        }
        return false;
    }
}
