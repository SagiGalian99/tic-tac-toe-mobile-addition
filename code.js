var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

class Block{
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.text = "";
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(this.text, this.x + this.w / 2 - 10, this.y -10 + this.h / 2);
        
    }
    onclick(x, y){
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h){
            return true;
        }
        return false;
    }
}

blocks = []
xBlock = 1;
yBlock = 1;
wBlock = canvas.width / 3 - 2;
hBlock = canvas.height / 3 - 2;
for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
        blocks.push(new Block(xBlock, yBlock, wBlock, hBlock, "blue"));
        xBlock += wBlock + 2;
    }   
    xBlock = 1;
    yBlock += hBlock + 2;
}

var x = undefined;
var y = undefined;
var turn = "X";
window.addEventListener("touchstart", function(ev){
    results = [];
    const rect = canvas.getBoundingClientRect();
    x = ev.touches[0].clientX - rect.left;
    y = ev.touches[0].clientY - rect.top;
    for (var i = 0; i < blocks.length; i++){
        if (blocks[i].onclick(x, y) && blocks[i].text == ""){
            blocks[i].text = turn;
            if (turn == "X") turn = "O";
            else turn = "X";
        }
    }
})

function main(){
    document.getElementById("turn").innerHTML = turn + "  turn";
    for (var i = 0; i < blocks.length; i++){
        blocks[i].draw();
    }
    window.requestAnimationFrame(main);
}
main()