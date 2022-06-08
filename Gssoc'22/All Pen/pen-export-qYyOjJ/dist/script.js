$(".option-main").click(function(){
  $(".options-container").toggleClass("open");
});

$(".style1").click(function(){
  $(".container").removeClass("style2");
  $(".style2").removeClass("active");
  $(this).addClass("active");
});

$(".style2").click(function(){
  $(".style1").removeClass("active");
  $(".container").removeClass("style1");
  $(".container").addClass("style2");
  $(this).addClass("active");
});