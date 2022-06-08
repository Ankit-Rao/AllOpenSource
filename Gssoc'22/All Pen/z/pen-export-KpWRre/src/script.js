/*
created by DIACO : https://codepen.io/MAW
powered by GSAP : https://www.greensock.com/
*/

var rail = document.getElementById("rail"),
 knob = document.getElementById("knob"),
 W = rail.getBBox().width,
 railLength = rail.getTotalLength();

Draggable.create(document.createElement('div'),{
type:'x',throwProps:true,bounds:{minX:0,maxX:W},
trigger:knob,overshootTolerance:0,onDrag:update,onThrowUpdate:update
});

function update(){
var P = rail.getPointAtLength(this.x/W*railLength);
TweenLite.set(knob,{attr:{cx:P.x,cy:P.y}})
};
/*
created by DIACO : https://codepen.io/MAW
*/
