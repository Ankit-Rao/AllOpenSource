// set explosion particle count
document.getElementById('maxParticles').value = 100;
// preload images
var img1 = document.createElement('img');
img1.src = "http://www.nevergrind.com/images/fireball.png";
var img2 = document.createElement('img');
img2.src = "http://www.nevergrind.com/images/orangeparticle50.png";
// dat screen shake
function screenShake(){
  var x1 = Math.random()*20-10;
  var y1 = Math.random()*20-10;  TweenMax.to(document.getElementById('demo'), .5, {
    startAt:{
      x: x1,
      y: y1
    },
    x: 0,
    y: 0,
    ease: RoughEase.ease
  });
}

// Greensock function
function test1(){
  // store some values
  var demo = document.getElementById('demo');
  var maxParticles = document.getElementById('maxParticles').value;
  var ease = Circ.easeOut;
  function remove(e){
    e.target.parentNode.removeChild(e.target);
  }
  // cloned particles
  var particle = document.createElement('img');
  particle.style.cssText = "position: absolute; left:388px; top:188px;";
  particle.src = "http://www.nevergrind.com/images/orangeparticle50.png";
  function explosion(count){
    var x = Math.random()*800-400;
    var y = Math.random()*400-200;
    var part = particle.cloneNode();
    demo.appendChild(part);
    TweenMax.to(part, (Math.random()*1+.5), {
      x: x,
      y: y,
      scale: .1,
      ease: ease,
      onComplete: function(){
        remove(this);
      }
    });
    if(++count < maxParticles){
      explosion(count);
      screenShake();
    }
  }
  // launch fireball
  var fireball = document.createElement('img');
  fireball.style.cssText = "position: absolute; left:0; top:-200px; z-index:9999;";
  fireball.src = "http://www.nevergrind.com/images/fireball.png";
  demo.appendChild(fireball);
  TweenMax.to(fireball, .5, {
    scale:.05,lazy:true,
    onComplete:function(){
      explosion(0);
      remove(this);
    }
  });
}
//////////////////////////////////////////////////////////////
// JQuery function
//////////////////////////////////////////////////////////////
function test2(){
  // store some values
  var $demo = $("#demo");
  var maxParticles = document.getElementById('maxParticles').value;
  // make a particle 
  var particle = $('<img>').css({
      position:"absolute",
      left: 388,
      top: 188
    }).attr("src","http://www.nevergrind.com/images/orangeparticle50.png");
  // particles explode
  function explosion(count){
    var x1 = Math.random()*800;
    var y1 = Math.random()*400;
    particle.clone()
    .appendTo($demo)
    .animate({
      left: x1,
      top: y1,
      width: 2,
      height: 2
    }, (Math.random()*1000+500), "easeOutQuad", function(){
      $(this).remove();
    });
    if(++count < maxParticles){
      explosion(count);
      screenShake();
    }
  }
  // launch a fireball
  $('<img>').css({
    position:"absolute",
    left: 0,
    top: -200,
    zIndex: 9999
  }).attr("src","http://www.nevergrind.com/images/fireball.png")
  .appendTo($demo)
  .animate({
    width: 80,
    height: 80,
    top: 160,
    left: 360
  }, 500, "easeOutQuad", function(){
    explosion(0);
    $(this).remove();
  });
}
$(function(){
  $(".fire").on("click", function(){
    window[this.id]();
  });
});