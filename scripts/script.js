const Card = {
    offset: 0,
    scale: 20,
    element: document.querySelector("#card"),
    container: document.querySelector("#mouse_overlay"),
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
        this.mouseX = (e.offsetX - this.container.offsetWidth / 2) / this.scale;
        this.mouseY =
            (e.offsetY - this.container.offsetHeight / 2) / this.scale;
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
        console.log(this.posX, this.posY);
    },
};

document.querySelector("#turn_left").addEventListener("click", () => {
    Card.left();
});

document.querySelector("#turn_right").addEventListener("click", () => {
    Card.right();
});

Card.container.addEventListener("mousemove", (e) => Card.mouse(e));

const frame = () => {
    if (Card.posX != Card.mouseX || Card.posY != Card.mouseY) {
        Card.posX = Card.mouseX;
        Card.posY = Card.mouseY;
        Card.update();
    }
    requestAnimationFrame(frame);
};
frame();
