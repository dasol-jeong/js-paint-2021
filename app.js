const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");

canvas.width=700;
canvas.height=700;

let painting=false;
let filling=false;

ctx.strokeStyle="#2c2c2c";
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

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}
if(mode){
    mode.addEventListener("click",fillBackground);
}