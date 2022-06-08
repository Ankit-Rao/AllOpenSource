var xmlns = "http://www.w3.org/2000/svg",
    xlinkns="http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select('.container'),
  eggGroup = select('.eggGroup'),
  eggContainer = select('.eggContainer'),
  segContainer = select('.segContainer'),
    seg = select('#seg'),
  allSeg = select('.allSeg'),
    segArr = [],
    segInitPosY = 20,
    egg = select('#egg'),
    mainEgg = egg.cloneNode(true),
    getStaggerDuration = function(num, offset, dur){
      var l = '-=' + (((num - 1) * offset) + dur);
      //console.log(l)
      return l;
}
//center the container cos it's pretty an' that
TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})
TweenMax.set('svg', {
  visibility:'visible'
})

eggContainer.appendChild(mainEgg);
TweenMax.set(mainEgg, {
    x:260,
    y:200,
  transformOrigin:'50% 100%'

})

for(var i=0; i < 24; i++){
  
  //var p = document.createElementNS(xmlns, 'use');
  var p = seg.cloneNode(true);
  segContainer.appendChild(p);
  //p.setAttributeNS(xlinkns, 'xlink:href', '#seg' );
 p.setAttribute('x', 260);
  p.setAttribute('y', segInitPosY + (i* 14));
  p.setAttribute('fill', '#FFFCDD');
  segArr.push(p);
}

for(var i = 0; i < 4; i++){
  
  var e = egg.cloneNode(true);
  eggGroup.appendChild(e);
  TweenMax.set(e, {
    x:260 + (i * 100),
    y:380,
    transformOrigin:'50% 100%'
  })
  
  if(i == 0){
    e.id = 'droppedEgg';
    e.setAttributeNS(null, 'opacity', 0)
  }  
  if(i == 3){
    e.id = 'lastEgg';
    
  }
}

TweenMax.set(segArr, {
  transformOrigin:'50% 50%'
})

function eggAnimation(){
  var eggRotation = Math.random() < 0.5 ? -1 : 1;
  
  var tl = new TimelineMax({repeat:0, repeatDelay:0, onComplete:resetEggs});

  tl.staggerTo(segArr, 0.6, {
    scaleX:1.6,
    yoyo:true,
    repeat:1,
    ease:Back.easeIn.config(1.2)
  }, 0.02)
    .to(segContainer, 1, {
    scaleY:0.9,
    //onStart:function(){console.log(tl.duration())},
    ease:Power2.easeIn
  },getStaggerDuration(segArr.length, 0.02, (0.6*2)))
  .to(segContainer, 0.66, {
    scaleY:1,
    ease:Elastic.easeOut.config(1, 0.5)
  },'-=0.66')
  .to(mainEgg, 0.6,{
    x:260,
    y:380,
    ease:Power4.easeIn
  },'-=0.99')
  .from(mainEgg, 3, {
    rotation:13 * eggRotation,
    immediateRender:false,
    ease:Elastic.easeOut.config(2, 0.25)
  },'-=0.6')
  .set(mainEgg, {
    alpha:0
  })
  .set('.eggGroup *', {
    alpha:1
  })
  .to('.eggGroup *',2,{
    x:'+=100',
    ease:Power2.easeOut
  })
  .to('.wheel', 2, {
    transformOrigin:'50% 50%',
    rotation:90,
    ease:Power1.easeOut
  },'-=2')
  .staggerTo('.eggGroup *',0.6,{
    rotation:-8
  },0.04,'-=2')
  .staggerTo('.eggGroup *',2,{
    rotation:0,
    ease:Anticipate.easeIn
  },0.06,'-=1.4') 
  .to('#lastEgg', 0.3, {
    rotation:180,
    transformOrigin:"50% 170%",
    ease:Power2.easeIn
  },'-=1')
  
  
  tl.timeScale(1.2)
}


function resetEggs(tl){
  console.log(this)
  this.pause(0);
  eggAnimation();
}

eggAnimation()