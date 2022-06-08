var timeline = new TimelineMax();

timeline.addLabel("bob",3);

 timeline.set("svg",{opacity:1});




// wing animation
var buzz = new TimelineMax({paused:true});
buzz.staggerTo(".left,.right", 1, {
	cycle: {
		rotation: [-30, 30],
		transformOrigin: ["top left", "top right"]
	},
	repeat: 49,
	yoyo: true,
	ease: Sine.easeInOut
}, 0, 0);


// animate buzz timeline
timeline.to(buzz, 1.7, {
	progress: 1,
	ease: Power4.easeOut
}, 0)


// bee landing
timeline.from(".bee", 1.5, {
	rotation: 120,
	scale: 5,
	y: 1200,
	ease: Quint.easeOut
}, 0);


// bug out eyes shortly before landing
timeline.staggerTo(".eye", 0.3, {
	scale: 1.2,
	yoyo: true,
	repeat: 1,
	transformOrigin: "center",
	ease: Back.easeIn
}, 0.1, "-=.3");


// M animation
timeline.to("#lines", 1.5, {
	"stroke-dashoffset": 0,
	ease: Quint.easeOut
}, 1.65);


// track bee with eye
timeline.fromTo(".eyeBall", 1.5, {
	y: 40
}, {
	y: 0,
	x: 20,
	ease: Quint.easeInOut
}, 0).to(".eyeBall", .5, {//chained animation
	y: 0,
	x: 0,
	ease: Sine.easeInOut
}, 1.5);


// eyeball blink
timeline.to(".eyeShape", .17, {
	attr: {
		d: "M354 386c30 60 142 60 172 0c-30 60 -142 60 -172 0"
	},
	yoyo: true,
	repeat: 1,
	ease: Sine.easeInOut
}, 1.5);


// eyelash blink
timeline.to(".eyelash", .17, {
	attr: {
		d: "M356 340c40 55 130 55 170 0v-18c-40 45 -130 45 -170 0"
	},
	yoyo: true,
	repeat: 1,
	ease: Sine.easeInOut
}, 1.5);



// instantiation of progress bar
  createProgressBar(timeline);