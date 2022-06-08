/* For more information on Greensock's DrawSVGPlugin: https://greensock.com/drawSVG?utm_source=Newsletter-December&utm_medium=email&utm_campaign=DrawSVGPlugin*/

var hairs = document.getElementsByTagName("path");
var areola = document.getElementById("areola");

TweenMax.set("#machoMan",{autoAlpha:1});
TweenMax.set(hairs,{drawSVG:"0% 0%"});
TweenMax.staggerTo(hairs,1,{drawSVG:"0% 90%",ease:Back.easeOut},.05);

areola.addEventListener("click",onPurpleNurple);

function onPurpleNurple(e){
  for(var i=0;i<hairs.length;i++){
    TweenMax.to(hairs[i],.3,{rotation:(Math.random()*30)-15,drawSVG:"0% 50%",ease:Quint.easeOut});
  }
  
  TweenMax.to(hairs,.3,{delay:.3,rotation:0,drawSVG:"0% 90%",ease:Back.easeOut});
  
  TweenMax.to(areola,.3,{scale:.6,ease:Quint.easeOut,transformOrigin:"50% 50%"});
  TweenMax.to(areola,.3,{delay:.3, scale:1,ease:Back.easeOut});
  
  TweenMax.to("#nipple",.3,{scale:1.5,ease:Quint.easeOut,transformOrigin:"50% 50%"});
  TweenMax.to("#nipple",.3,{delay:.3, scale:1,ease:Back.easeOut});
  
  TweenMax.to("#bruise",2,{opacity:.7,ease:Quint.easeOut});
  TweenMax.to("#bruise",3,{delay:2, opacity:0, ease:Quint.easeIn});
}