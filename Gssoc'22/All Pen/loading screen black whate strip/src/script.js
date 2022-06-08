var colors = ["red", "blue", "green", "purple", "gray", "yellow", "orange"];



var timeline=new TimelineMax({repeat:-1});
timeline.add(TweenMax.staggerTo(".bob",0,{alternate:{backgroundColor:randomColor}},0));
	timeline.add(TweenMax.staggerFrom(".bob",.5,{opacity:0,alternate:{rotation:[-100,100],x:["+=200","-=200"],transformOrigin:["100% 100%","0% 100%"]}},.05));
	timeline.add(TweenMax.staggerTo(".bob",.5,{delay:2,opacity:0,alternate:{rotation:[100,-100],x:["+=200","-=200"],transformOrigin:["100% 100%","0% 100%"],backgroundColor:randomColor}},.05));

function randomColor(i) {
    //return a random color from the array
    return colors[ Math.floor(Math.random() * colors.length) ];
}