maxRotation = 360;
svgNode = document.getElementById('svg-node');
container = document.getElementById('container');
dialValue = document.getElementById('dial-value');

info = document.getElementById('info');
nullObject = document.getElementById('null-object');
dialLine = document.getElementById('dial-line');
dialLineBg = document.getElementById('dial-line-bg');
outline = document.getElementById('outline');
TweenMax.set(document.body, {
  userSelect:'none'
})
TweenMax.set(dialLine, {
  drawSVG:'0%'
 
});

TweenMax.set(outline, {

  alpha:0.5
});
TweenMax.set(dialLineBg, {

  alpha:0.05
});

TweenMax.set([container, svgNode, dialValue, info], {
  position:'absolute',
             left:'50%',
             top:'50%',
             xPercent:-50,
             yPercent:-50,
  
});

TweenMax.set(svgNode, {
  rotation:'-=90'
})

TweenMax.set(nullObject, {
  position:'absolute',
  x:0
})


Draggable.create(container, {
  //trigger:container,
  bounds:{maxRotation:maxRotation, minRotation:0},
  type:'rotation',
  throwProps:true,
  onDrag:dragUpdate,
  onThrowUpdate:dragUpdate
})

function dragUpdate(){
  var val = (container._gsTransform.rotation/maxRotation);
  

  var percent = val * 100;
    //console.log(percent);
  percent = (percent > 100) ? 100 : percent;
  percent = (percent < 0) ? 0 : percent;
 
  TweenMax.set(dialLine, {
    drawSVG:percent + '%'
  })
    TweenMax.set(outline, {
    drawSVG:'100% ' + percent + '%'
  })
  
  dialValue.innerHTML = Math.floor(percent);
  
}