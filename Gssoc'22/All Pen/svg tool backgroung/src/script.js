TweenMax.set('.container', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})
var tl = new TimelineMax({
  repeat: -1
});
tl.timeScale(3)
tl.to('.gripGroup path', 2, {
    y: -23,
    ease: Anticipate.easeIn
  })
  .to('.finTop', 2, {
    scaleY: 0,
    transformOrigin: '50% 100%',
    ease: Anticipate.easeIn
  }, '-=2')
  .to('.finBot', 2, {
    scaleY: 0,
    transformOrigin: '50% 0%',
    ease: Anticipate.easeIn
  }, '-=2')
  .set('.gripGroup path', {
    y: 0
  })

.to('.gripGroup path', 2, {
    y: -23,
    ease: Anticipate.easeIn
  })
  .to('.finTop', 2, {
    y: 0,
    scaleY: 1,
    transformOrigin: '50% 100%',
    ease: Anticipate.easeIn
  }, '-=2')
  .to('.finBot', 2, {
    y: 0,
    scaleY: 1,
    transformOrigin: '50% 0%',
    ease: Anticipate.easeIn
  }, '-=2')
var drillBitTl = new TimelineMax();
drillBitTl.to('.drillGrooveGroup line', 0.2, {
  x: 13,
  repeat: 20,
  ease: Linear.easeNone
})
var drillTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 1
});
drillTl.timeScale(1)
drillTl.to('.trigger', 0.3, {
    x: 10,
    transformOrigin: '10% 0%',
    repeat: 1,
    yoyo: true,
    ease: Sine.easeIn
  })
  .to(drillBitTl, 3, {
    time: drillBitTl.duration(),
    ease: Sine.easeOut
  }, '-=0.6')
  .staggerTo(".drillVentGroup path", 0.1, {
    fill: '#262626',
    repeat: 21,
    yoyo: true,
    ease: Sine.easeOut
  }, 0.06, '-=3')
  .staggerTo('.drillDetailsGroup line', 0.1, {
    stroke: '#262626',
    repeat: 21,
    yoyo: true,
    ease: Sine.easeOut
  }, 0.06, '-=3')