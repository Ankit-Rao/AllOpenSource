var timeline = new TimelineMax({repeat: -1});
timeline.to("#tail, #tailShadow", 2, {morphSVG: "#tail2", ease: Back.easeInOut});
timeline.to("#tail, #tailShadow", 2, {morphSVG: "#tail3", ease: Back.easeInOut});
timeline.to("#tail, #tailShadow", 2, {morphSVG: "#tail4", ease: Back.easeInOut});
timeline.to("#tail, #tailShadow", 2, {morphSVG: "#tail1", ease: Back.easeInOut});

tweenEar("left");
tweenEar("right");

function tweenEar(direction) {
  TweenMax.to("#"+direction+"Ear, #"+direction+"EarShadow", (Math.random() * .5) + .3, {rotation: (Math.random() * 20) - 15, transformOrigin: "30% 100%", delay: (Math.random() * .5) + .6, ease: Quart.easeInOut, onComplete: tweenEar, onCompleteParams: [direction]});
}