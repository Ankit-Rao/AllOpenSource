/* a Pen by DIACO : twitter.com/Diaco_ml || codepen.io/MAW
powered by GSAP : https://www.greensock.com/
*/

///////////////////////////////////////////
// 2 rings

/*var container = document.querySelector('#container') ,
S1 = document.querySelector(".R-T") ,
S2 = document.querySelector(".R-D");
container.insertBefore(S1.cloneNode(true),S1);
container.insertBefore(S2.cloneNode(true),S2);

TweenLite.set(container,{perspective:300});
TweenMax.staggerTo('.R-D,.R-T',1,{rotationX:180,repeat:-1,ease:Linear.easeNone,delay:-2},0.5);
TweenMax.to('.R-D,.R-T',40,{rotation:360,repeat:-1,ease:Linear.easeNone});
TweenMax.to('#core',2,{scale:0.95,backgroundColor:'hsl(+=20,+=0%,-=10%)',repeat:-1,yoyo:true,ease:Sine.easeInOut});*/

///////////////////////////////////////////
// 1 ring

TweenLite.set(container,{perspective:300,scale:0.95});
TweenMax.to('.R-D,.R-T',1,{rotationX:180,repeat:-1,ease:Linear.easeNone});
TweenMax.to('.R-D,.R-T',40,{rotation:360,repeat:-1,ease:Linear.easeNone});
TweenMax.to('#core',1,{scale:0.95,backgroundColor:'hsl(+=20,+=0%,-=10%)',repeat:-1,yoyo:true,ease:Sine.easeInOut});

// a Pen by DIACO : twitter.com/Diaco_ml || codepen.io/MAW