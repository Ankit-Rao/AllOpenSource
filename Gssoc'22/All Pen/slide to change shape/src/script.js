var svg = document.getElementById('scene');
var topLeft=document.getElementById("topLeft");
var isDown=false;
var mousePoint = svg.createSVGPoint();
var mouseX,mouseY;
var isLocked=false;
topLeft.addEventListener("mousedown",onDown);
svg.addEventListener('mousemove',getMousePosition);
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();
animate();
function onDown(e){
  isDown=true;
  window.addEventListener("mouseup",onUp);
}
function onUp(e){
  isDown=false;
  window.removeEventListener("mouseup",onUp);
}
function animate(){
  if(isDown){
    var positionX=Math.min(Math.max(mouseX,30),130);
    var positionY=Math.min(Math.max(mouseY,30),130);
    if(isLocked){
      positionX=positionY=Math.max(positionX,positionY);
    }
    var radiusX=positionX-30;
    var radiusY=positionY-30;
    if(radiusX==0||radiusY==0){
      radiusX=radiusY=0;
    }
    
    TweenMax.set(topLeft,{attr:{cx:positionX,cy:positionY}});
    TweenMax.set("#rectangle",{attr:{rx:radiusX,ry:radiusY}});
  }
  requestAnimFrame(animate);
}
function getMousePosition(e){
  isLocked=e.shiftKey;
  mousePoint.x = e.clientX;
  mousePoint.y = e.clientY;
  var location= mousePoint.matrixTransform(svg.getScreenCTM().inverse());
  mouseX=location.x;
  mouseY=location.y;
}