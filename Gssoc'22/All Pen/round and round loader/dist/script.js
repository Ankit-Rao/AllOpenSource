var duration=.6;
var middle=.3;

var timeline = new TimelineMax({repeat:-1,repeatDelay:.1});

timeline.to(".ring",duration,{
	ease:Power2.easeIn,
	"stroke-dasharray":"211.71 70.57"});

timeline.to(".ring",duration,{
	delay:middle,
	ease:Power2.easeOut,
	"stroke-dasharray":"0 282.28",
	"stroke-dashoffset":-211.71});

timeline.to(".ring",(duration*2)+middle,{
	ease:Power2.easeInOut,
	rotation:360,
	transformOrigin:'50% 50%'},0);