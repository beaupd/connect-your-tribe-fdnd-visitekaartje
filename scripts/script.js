const Card = {
    offset: 0,
    scale: 39,
    element: document.querySelector("#card"),
    container: document.body,
    posX: 0,
    posY: 0,
    mouseX: 0,
    mouseY: 0,

    right() {
        this.offset += 180;
        this.update();
    },
    left() {
        this.offset -= 180;
        this.update();
    },
    mouse(e) {
        // console.log(e.clientX, e.clientY);
        this.mouseX =
            ((e.clientX - window.innerWidth / 2) / window.innerWidth) *
            this.scale;
        this.mouseY =
            ((e.clientY - window.innerHeight / 2) / window.innerHeight) *
            this.scale;
        // console.log(e.offsetX, this.posX);
        // console.log(e.offsetY, this.posY);
        // this.update();
    },
    update() {
        this.element.style.transform = `rotateY(${
            this.offset + this.posX
        }deg) rotateX(${
            this.offset % 360 != 0 ? this.posY : -1 * this.posY
        }deg)`;
        // console.log(this.element.style.transform);
    },
};

document.querySelector("#turn_left").addEventListener("click", () => {
    Card.left();
});

document.querySelector("#turn_right").addEventListener("click", () => {
    Card.right();
});

window.addEventListener("mousemove", (e) => Card.mouse(e));

const frame = () => {
    if (Card.posX != Card.mouseX || Card.posY != Card.mouseY) {
        Card.posX = Card.mouseX;
        Card.posY = Card.mouseY;
        Card.update();
    }
    requestAnimationFrame(frame);
};
frame();

const aapie = async () => {
    const api = new InterfaceMember();
    // let data = {
    //     memberId: 17,
    //     nickname: "XX_GamerDutchHD_XX",
    //     avatar: "https://avatars.githubusercontent.com/u/72515598?s=400&u=ea309bc2ce824f3b011f175fd0c1b32a3e47f794&v=4",
    //     githubHandle: "beaupd",
    // };
    // await api.patch(data);
    // let data = {
    //     squadId: 1,
    //     type: "string",
    //     nickname: "string",
    //     name: "string",
    //     prefix: "string",
    //     surname: "string",
    //     avatar: "string",
    //     githubHandle: "string",
    //     bio: "string",
    //     url: "string",
    // };
    // await api.post(data);
    // console.log(api.members);
};

aapie();
