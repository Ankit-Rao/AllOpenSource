/* a Pen by DIACO : twitter.com/Diaco_ml || codepen.io/MAW
powered by GSAP : https://www.greensock.com/
*/

var tl = new TimelineMax({repeat:-1})
.staggerTo('.dots',1,{y:50,backgroundColor:'orange',repeat:1,yoyo:true},0.5);

var Tweens = tl.getChildren()[0].getChildren();

var StaggerGaps = function( STweens , amount ){ // amount = gaps duration
	for(var i=0; i<STweens.length; i++){ STweens[i].startTime(amount*i) }
};

// just need to call like this : StaggerGaps( Tweens , 0.5 );

function setGap(X){
  var progress = tl.progress();
  tl.pause(0); 
  StaggerGaps(Tweens,X.value); 
  tl.restart();
  tl.progress(progress);
};

// a Pen by DIACO : twitter.com/Diaco_ml || codepen.io/MAW