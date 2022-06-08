var $p = $('#p'),
    p = { y: 0, offset:0 };
var textPath=document.getElementById("textPath");
TweenMax.to(p, 4, {
  y: 300,
  offset: 40,
  repeat: -1,
  yoyo: true,
  ease: Sine.easeInOut,
  onUpdate: function() {
    $p.attr('d', 'M 100,150 Q 200,'+p.y+' 500,150 T 900,150');
    textPath.setAttribute('startOffset', p.offset+'%');
  }
});