//rotate and move elements with a class of "box" ("x" is a shortcut for a translateX() transform) over the course of 1 second. 

function random(min=0,max=1){
  var range = max-min;
  return function (){
    return (Math.random()*range)+min;
  }
}

gsap.to(".box", {
  rotation: random(-90,90),
  x: random(-40,40),
  y: random(-40,40),
  duration: 1.3,
  yoyo:true,
  repeat:-1,
  ease:"elastic",
  yoyoEase:"strong.inOut"
});