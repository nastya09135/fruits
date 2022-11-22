class Game {
    constructor() {
        this.name = name;
        this.$zone=$('.elements');
        this.elements=[];
        this.player = this.generate(Player);
    }
    start() {
        this.loop();
    }

    loop() {
        requestAnimationFrame(() => {
            this.updateElements();
            this.setParams();
            this.loop();
        })
    }
    setParams() {
        let params = ['name'];
        let value = [this.name];

        params.forEach((e, i) => {
            $(`#${e}`).html(value[i]);
        })
    }
    updateElements(){
        this.elements.forEach(e => {
            e.update();
            e.draw();
        })
    }

    generate(className){
        let element = new className(this);
        this.elements.push(element);
        return element;
    }
}
window.onload = () => {
    checkStorage();
    nav();
    startLoop();
    setInterval(() => {
        if (panel === "game") {
            game.game = new Game();
            game.game.start();
            panel = "game procces";
        }
    }, 500)
};

class Drawable{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.w = 0;
        this.offsets = {
            x: 0,
            y: 0
        }
    }

    creatElement(){
        this.$element = $('<div class="element ${this.constructor.name.toLowerCase()}"></div>');
        this.game.$zone.append(this.$element);
    }

    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }

    draw() {
        this.$element.css({
            left: this.x + "px",
            top: this.y + "px",
            width: this.w + "px",
            height: this.h + "px"
        })
    }
}
class Player extends Drawable {
    constructor(game){
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = this.game.$zone.width() / 2 - this.w / 2;
        this.y = this.game.$zone.height() - this.h;
        this.createElement();
    }
}


