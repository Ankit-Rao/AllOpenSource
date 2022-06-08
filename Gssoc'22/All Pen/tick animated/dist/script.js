var check=new TimelineMax({repeat:-1, repeatDelay:2,})
check.to(".check",.8,{
	ease:Power4.easeOut,
	"stroke-dasharray":"53.84 272",
	"stroke-dashoffset":-272});

check.to(".check",.2,{
	ease:Power2.easeInOut,
	stroke:"#000",},"-=.6");

check.from(".circle",.4,{opacity:0,scale:0.5,ease:Back.easeOut.config(3.5),transformOrigin:"center"},"-=0.4");