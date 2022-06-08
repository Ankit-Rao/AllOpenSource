var tweens = TweenMax.staggerTo(".ray",500,{ease:Linear.easeNone,repeat:-1,"stroke-dashoffset":-60000});
console.log(tweens)

for(var i=0;i<tweens.length;i++){
	var tween = tweens[i];
	tween.progress(Math.random()+0.5);
	tween.timeScale(Math.random()+0.5);
}