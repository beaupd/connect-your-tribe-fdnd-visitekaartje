// new ; update
// post and patch
const Form = {
    form: document.querySelector("#form"),
    succes: document.querySelector("#successMessage"),
    data: {
        method: this.form.querySelector("select[name='method']"),
        memberId: this.form.querySelector("input[name='memberId']"),
        squadId: this.form.querySelector("input[name='squadId']"),
        type: this.form.querySelector("select[name='type']"),
        nickname: this.form.querySelector("input[name='nickname']"),
        name: this.form.querySelector("input[name='name']"),
        prefix: this.form.querySelector("input[name='prefix']"),
        surname: this.form.querySelector("input[name='surname']"),
        avatar: this.form.querySelector("input[name='avatar']"),
        githubHandle: this.form.querySelector("input[name='githubHandle']"),
        bio: this.form.querySelector("input[name='bio']"),
        url: this.form.querySelector("input[name='url']"),
        submit: this.form.querySelector("input[name='submit']"),
    },
    api: new InterfaceMember(),
    type: "update",

    async fill() {
        if (this.type == "new") {
            for (let d in this.data) {
                if (d != "method" && d != "type" && d != "submit") {
                    this.data[d].value = "";
                    this.data[d].placeholder = this.data[d].name;
                }
            }
        } else if (this.type == "update") {
            let user = await this.api.getUserById(this.data.memberId.value);
            if (user) {
                for (let d in user) {
                    if (Object.prototype.hasOwnProperty.call(user, d)) {
                        if (
                            d != "method" &&
                            d != "type" &&
                            d != "submit" &&
                            this.data[d].placeholder &&
                            user[d] != ""
                        ) {
                            this.data[d].placeholder = user[d];
                            this.data[d].value = user[d];
                        } else if (user[d] == "") {
                            this.data[d].placeholder = this.data[d].name;
                            this.data[d].value = "";
                        }
                    }
                }
            }
        }
    },
    validate() {
        let valid = true;
        for (let d in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                // console.log(d, this.data[d]);
                let f = this.data[d];
                let v = f.value;
                if (!f.disabled && f.name != "method") {
                    if (this.type == "new") {
                        if (v.length > 0) {
                            f.classList.add("valid");
                            f.classList.remove("invalid");
                        } else {
                            f.classList.remove("valid");
                            f.classList.add("invalid");
                            valid = false;
                        }
                    } else if (f.name == "memberId") {
                        if (v.length > 0) {
                            f.classList.add("valid");
                            f.classList.remove("invalid");
                        } else {
                            f.classList.remove("valid");
                            f.classList.add("invalid");
                            valid = false;
                        }
                    } else {
                        f.classList.remove("valid");
                        f.classList.remove("invalid");
                    }
                } else {
                    f.classList.remove("valid");
                    f.classList.remove("invalid");
                }
            }
        }
        if (valid == true) {
            this.data.submit.disabled = false;
        } else {
            this.data.submit.disabled = true;
        }
    },
    setType(type) {
        if ((type == "new") | (type == "update")) this.type = type;
        else console.log("%cWrong type of form", "color: red");
        this.update();
        this.fill();
    },
    async submit() {
        if (this.type == "update") {
            // patch
            let form = this.form;
            let id = form.querySelector("[name='memberId']").value;
            await this.api.fetch();
            let user = await this.api.getUserById(id);
            let childs = form.querySelectorAll("span");
            await new Promise((res, err) => {
                for (let i = 1; i < childs.length - 1; i++) {
                    d = childs[i];
                    if (d.querySelector("input") || d.querySelector("select")) {
                        let field =
                            d.querySelector("input") ||
                            d.querySelector("select");
                        if (field.value != "") {
                            user[field.name] = field.value;
                        }
                    }
                }
                res("succes");
            }).then(async (_) => {
                await this.api.patch(user);
                this.form.style.display = "none";
                this.succes.style.display = "flex";
            });
        } else if (Form.type == "new") {
            // post
            let form = Form.form;
            let childs = form.querySelectorAll("span");
            let user = {};
            await new Promise((res, err) => {
                for (let i = 1; i < childs.length - 1; i++) {
                    d = childs[i];
                    if (d.querySelector("input") || d.querySelector("select")) {
                        let field =
                            d.querySelector("input") ||
                            d.querySelector("select");
                        if (field.value != "") {
                            user[field.name] = field.value;
                        }
                    }
                }
                res("succes");
            }).then(async (_) => {
                let res = await this.api.post(user);
                console.log(res);
            });
        }
    },
    update() {
        if (this.type == "update") {
            for (let d in this.data) {
                if (d != "submit") {
                    if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                        this.data[d].disabled = false;
                    }
                }
            }
        } else if (this.type == "new") {
            this.data.memberId.disabled = true;
            // this.data.squad.disabled = true;
        } else {
            console.log("%cWrong type of form", "color: red");
        }
        this.validate();
    },
    submitHandler(e) {
        e.preventDefault();
        Form.submit();
        return false;
    },
    init() {
        this.form.addEventListener("submit", this.submitHandler);
        for (let d in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, d)) {
                // console.log(d, this.data[d]);
                this.data[d].addEventListener("keyup", () => this.validate());
            }
        }
        this.data.method.addEventListener("change", () => {
            this.setType(this.data.method.value);
        });
        this.data.memberId.addEventListener("input", () => {
            if (this.type == "update") {
                this.fill();
            }
        });
        this.data.submit.disabled = true;
        this.api.fetch();
        this.update();
    },
};

Form.init();
