// new ; update
// post and patch

const Form = {
    form: document.querySelector("#form"),
    data: {
        id: this.form.querySelector("input[name='m_id']"),
        squad: this.form.querySelector("input[name='squad']"),
        type: this.form.querySelector("select[name='type']"),
        nickname: this.form.querySelector("input[name='nickname']"),
        name: this.form.querySelector("input[name='name']"),
        prefix: this.form.querySelector("input[name='prefix']"),
        surname: this.form.querySelector("input[name='surname']"),
        avatar: this.form.querySelector("input[name='avatar']"),
        github: this.form.querySelector("input[name='github']"),
        bio: this.form.querySelector("input[name='bio']"),
        url: this.form.querySelector("input[name='url']"),
        submit: this.form.querySelector("input[name='submit']"),
    },

    type: "update",

    validate() {
        console.log("va");
        for (let d in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                // console.log(d, this.data[d]);
                let f = this.data[d];
                let v = f.value;
                if (v.length > 0) {
                    f.classList.add("valid");
                    f.classList.remove("invalid");
                } else {
                    f.classList.remove("valid");
                    f.classList.add("invalid");
                }
            }
        }
    },
    setType(type) {
        if ((type == "new") | (type == "update")) this.type = type;
        else console.log("%cWrong type of form", "color: red");
        this.update();
    },
    async submit(e) {
        e.preventDefault();
        console.log("submitted", e);
        const api = new InterfaceMember();
        let data = {
            memberId: 17,
            nickname: "XX_GamerDutchHD_XX",
            avatar: "https://avatars.githubusercontent.com/u/72515598?s=400&u=ea309bc2ce824f3b011f175fd0c1b32a3e47f794&v=4",
            githubHandle: "beaupd",
        };
        await api.patch(data);
        if (this.type == "update") {
            // patch
        } else if (this.type == "new") {
            // post
        }
    },
    update() {
        if (this.type == "new") {
            for (let d in this.data) {
                if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                    this.data[d].disabled = false;
                }
            }
        } else if (this.type == "update") {
            this.data.id.disabled = true;
        } else {
            console.log("%cWrong type of form", "color: red");
        }
    },
    init() {
        this.form.addEventListener("submit", this.submit);
        for (let d in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                // console.log(d, this.data[d]);
                this.data[d].onkeyup = this.validate;
            }
        }
        // this.data.submit.disabled = true;
        this.update();
    },
};

Form.init();
