var timeline = new TimelineMax({onUpdate:updateProgress});
timeline.set(".darth",{rotation:5,transformOrigin:"60% 70%"});
timeline.to(".darth",2.3,{rotation:0,transformOrigin:"60% 70%",ease:Sine.easeInOut});

timeline.to(".darth",4.3,{rotation:5,transformOrigin:"60% 70%",ease:Sine.easeInOut});

timeline.to(".darth",1.3,{rotation:3,transformOrigin:"60% 70%",ease:Sine.easeInOut});

timeline.to(".darth",4.5,{rotation:5,transformOrigin:"60% 70%",ease:Sine.easeInOut});

insert(3.7);
insert(5.3);
insert(9.7);
insert(10.8);



function insert(time) {
  
  timeline.staggerFromTo("ellipse", .9, {
    scale: 0,
    opacity: 1
  }, {
    scale: 6,
    opacity: 0,
    transformOrigin: "50% 35%",
    ease: Sine.easeOut
  }, .1, time);
}
var audio = document.querySelector("audio");
function updateProgress(){
  timeline.seek(audio.currentTime);
}

