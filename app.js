const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const INITIAL_COLOR="#2C2C2C";
const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

let painting=false;
let filling=false;


ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;


function stopPainting(event){
    painting=false;

}
function startPainting(event){
    painting=true;
}
function onMouseMove(evnet){
    const x=event.offsetX;
    const y=event.offsetY;
    //console.log(x,y);
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function fillBackground(event){
    if(filling === true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
    }
}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}


function onMouseUp(event){
    painting=false;
}
function onMouseLeave(evnet){
    stopPainting();
}
function handleRangeChange(event){
  const size=event.target.value;
  ctx.lineWidth=size;  
}
function handleCM(event){
    event.preventDefault();
}
function saveClick(){
    //defalut는 png임
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS[🎨]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}
if(mode){
    mode.addEventListener("click",fillBackground);
}
if(saveBtn){
    saveBtn.addEventListener("click",saveClick);
}