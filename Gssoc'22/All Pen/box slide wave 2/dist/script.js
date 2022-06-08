var track = document.getElementById("track");
var coaster = document.getElementById("coaster");
var radians = 180/Math.PI;
var progress = {
  percentage: 0
};
TweenMax.to(progress, 3, {
  repeatDelay: 2,
  percentage: 1,
  repeat: -1,
  ease: Quint.easeInOut,
  onUpdate: update
});

function update() {
  var trackLength = track.getTotalLength();
  var segmentLength = progress.percentage * trackLength;
  var point = track.getPointAtLength(segmentLength);
  var point2 = track.getPointAtLength(segmentLength+1);
  var angle = Math.atan2(point2.y-point.y,point2.x-point.x)*radians;
  TweenMax.set(coaster,{x:point.x-64,y:point.y-400,rotation:angle,transformOrigin:"center"});
}