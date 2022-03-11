const canvas= document.getElementById("jsCanvas");
const ctx =canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

//console.log(Array.from(colors));
canvas.width = CANVAS_SIZE;   //pixel 사이즈
canvas.height = CANVAS_SIZE;  //pixel 사이즈

ctx.strokeStyle = "INITIAL_COLOR";  //선의 색
ctx.lineWidth = 2.5;  //선의 너비
//ctx.fillRect(50, 20, 100, 49) // x,y, width, height
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() { 
    painting = true;
}

// path는 선, path를 만들면 마우스의 x,y 좌표로 path를 옮긴다.
//path의 시작점은 마우스가 있는 곳이다.

function onMouseMove(event) {
    const x= event.offsetX;  //좌표
    const y= event.offsetY;  //좌표
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
    //console.log(color);
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
    //console.log(event.target.value);
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //canvas만큼 커야 한다.
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg"); //canvas의 데이터를 image처럼 가져오기
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
    //console.log(image);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}
