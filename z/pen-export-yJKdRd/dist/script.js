$(document).ready(function(){
  var choice = "background-color";
  $("#backgrs").css("text-decoration","underline");
  $("#drag1").draggable({
    axis:"x",
    grid:[10,0],
    containment:"parent",
    stop:function(event,ui){
      var w = $(this).position();
      $("#x1").text(w.left-10);
      $("#width").text(w.left-10+"px");
      var width = $("#x1").text();
 $("#changed").css("width",width+"px")
    }//stop
  })//drag1
  $("#drag2").draggable({
    axis:"x",
    grid:[10,0],
    containment:"parent",
    stop:function(event,ui){
      var z = $("#drag2").position();
      $("#x2").text(z.left-10);
      $("#height").text(z.left-10+"px");
      var height = $("#x2").text();
 $("#changed").css("height",height+"px")
    }//stop
  })//drag2
  $("#drag3").draggable({
    axis:"x",
    grid:[34,0],
    containment:"parent",
    stop:function(event,ui){
      var o = $(this).position();
      $("#x3").text((o.left-10)/340);
      $("#opacity").text((o.left-10)/340)
      var opacity = $("#x3").text();
      $("#changed").css("opacity",opacity);
    }//stop
  })//drag3
  $("#drag4").draggable({
    axis:"x",
    grid:[17,0],
    containment:"parent",
    stop:function(event,ui){
      var b = $(this).position();
      $("#x4").text((b.left-10)/17);
      $("#border").text((b.left-10)/17+"px")
      var border = $("#x4").text();
     $("#changed").css("border","solid "+border+"px #00AAA0");
    }///stop
  })//drag4
  $("#drag5").draggable({
    axis:"x",
    containment:"parent",
    grid:[2,0],
    stop:function(event,ui){
      var br = $(this).position();
      $("#x5").text((br.left-10)/2);
      $("#radius").text((br.left-10)/2+"px")
      var borderradius = $("#x5").text();
      $("#changed").css("border-radius",borderradius+"px");
    }//stop
  })//drag5
  $("#drag6").draggable({
    axis:"x",
    grid:[15,0],
    containment:"parent",
    stop:function(event,ui){
      var a = $(this).position();
      $("#x6").text((a.left-10)/15);
      $("#shadow").text(Math.round((a.left-10)/15)+"px");
      var boxshadow = $("#x6").text();
      $("#changed").css("box-shadow",boxshadow+"px "+boxshadow +"px "+boxshadow+"px #1a1a1a");
    }//stop
  })//drag6
  
  $("#borders").click(function(){
    choice = "border-color";
    $(this).css("text-decoration","underline");
    $("#backgrs").css("text-decoration","none");
  });//borders
  $("#backgrs").click(function(){
    choice = "background-color";
    $(this).css("text-decoration","underline");
    $("#borders").css("text-decoration","none");
  });//borders
  
  $("#col8").click(function(){
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    $(this).css("background-color","rgb("+r+","+g+","+b+")");
  });
  
  $(".cols").click(function(){
    var col = $(this).css("background-color");
    $("#changed").css(""+choice+"",""+col+"");
  });//cols change color
})//query