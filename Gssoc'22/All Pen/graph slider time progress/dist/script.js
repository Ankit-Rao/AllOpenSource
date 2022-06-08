var p0, p1, p2, p3, q0, q1, q2, r0, r1, target,selectedHandle;
var point=document.querySelector("#point");
var progressLine=document.querySelector("#progress");
var handles = document.querySelectorAll(".handle");
var line1=document.querySelector("#line1");
var line2=document.querySelector("#line2");
var curve=document.querySelector("#curve");
var progress=0;
update(progress);
function update(percent) {
  progress=percent;
  for (var p = 0; p < 4; p++) {
    var handle = handles[p];
    if(p>0&p<=2){
      handle.addEventListener("mousedown",onDown);
    }
    this["p" + p] = {
      x: Number(handle.getAttribute("cx")),
      y: Number(handle.getAttribute("cy"))
    };
  }
  for (var q = 0; q < 3; q++) {
    this["q" + q] = getPoint(this["p" + q], this["p" + (q + 1)], percent);
  }
  for (var r = 0; r < 2; r++) {
    this["r" + r] = getPoint(this["q" + r], this["q" + (r + 1)], percent);
  }
  target=getPoint(r0,r1,percent);
  point.setAttribute("cx", target.x);
  point.setAttribute("cy", target.y);
  progressLine.setAttribute("y2", target.y);
  progressLine.setAttribute("y1", target.y);
  line1.setAttribute("x2", p1.x);
  line1.setAttribute("y2", p1.y);
  line2.setAttribute("x2", p2.x);
  line2.setAttribute("y2", p2.y);
  curve.setAttribute("d", "M0,200C"+[p1.x,p1.y,p2.x,p2.y]+",200,0");
}

function onDown(e){
  selectedHandle=e.target;
 window.addEventListener("mouseup",onUp); window.addEventListener("mousemove",onDrag);
}
function onUp(e){
 window.removeEventListener("mouseup",onUp); window.removeEventListener("mousemove",onDrag);
}
function onDrag(e){
  selectedHandle.setAttribute("cx",e.clientX-200);
  selectedHandle.setAttribute("cy",e.clientY-200);
  update(progress);
  
}

function getPoint(point1, point2, percent) {
  return {
    x: interpolate(point1.x, point2.x, percent),
    y: interpolate(point1.y, point2.y, percent)
  }
}

function interpolate(min, max, percent) {
  return (1 - percent) * min + percent * max;
}
function sliderUpdate(e){
  update(e.target.value);
}