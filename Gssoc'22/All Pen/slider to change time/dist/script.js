var tween = TweenMax.allTo(["#hours","#minutes","#seconds"], 3, {
  cycle: {
    rotation: [360, 4320, 259200]
  },
  transformOrigin: "50% 100%",
  ease: Linear.easeNone,
  onUpdate:updateClock
});
var timeline = new TimelineMax({paused:true});
timeline.add(tween);

var text = document.querySelector(".output");
function updateClock(){
   var progress = timeline.progress();
  
  var hours = Math.floor(progress * 12)%12;
  hours = hours==0?12:hours;
  var minutes = Math.floor(progress * 60 * 12)%60;
  minutes = minutes<10?"0"+minutes:minutes;
  text.textContent = hours+":"+minutes;
}


var slider = document.querySelector("input");
slider.addEventListener("input", onChange);

function onChange(e){
  TweenMax.to(timeline,1,{progress:slider.value,ease:Power2.easeOut});
}