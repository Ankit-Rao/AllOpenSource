var leftTransform = "70% 70%";
var rightTransform = "70% 30%";

function moveEyes(){
	var angle = (Math.random()*20)-10;
	var ease = Power2.easeInOut;
	var duration = Math.random()+1;
	var delay = Math.random()*3;
	TweenMax.to("#left",duration,{delay:delay,rotation:angle, transformOrigin:leftTransform,ease:ease});
	TweenMax.to("#right",duration,{delay:delay,rotation:-angle, transformOrigin:rightTransform,ease:ease,onComplete:moveEyes});
}

function squint(){
	var scale = (Math.random()*.2)+.9;
	var ease = Power2.easeInOut;
	var duration = Math.random()+1;
	var delay = Math.random()*3;
	TweenMax.to("#left",duration,{delay:delay,scaleY:scale, transformOrigin:leftTransform,ease:ease});
	TweenMax.to("#right",duration,{delay:delay,scaleY:scale, transformOrigin:rightTransform ,ease:ease,onComplete:squint});
}

TweenMax.to("#face",5,{y:-5, ease:Sine.easeInOut, repeat:-1, yoyo:true});

var mouthTween = TweenMax.to("#mouth",1,{morphSVG:"#mouth2", ease:Linear.easeNone});

function moveMouth(){
	var progress = Math.random();
	var ease = Sine.easeInOut;
	var duration = (Math.random()*2)+3;
	var delay = Math.random()*3;
	TweenMax.to(mouthTween,duration,{delay:delay,progress:progress,ease:ease, onComplete:moveMouth});
}

moveEyes();
squint();
moveMouth();