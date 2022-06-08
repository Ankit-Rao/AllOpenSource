$(document).ready(function() {
  function getdate() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (s < 10) {
      s = "0" + s;
    }

    $(".time").text(h + ":" + m);
    setTimeout(function() {
      getdate();
    }, 500);
  }


  getdate();

  $(".g").click(function() {
    $(".innerframe").removeClass("black offwhite pink");
    $(".innerframe").addClass("gold");
    $(".screen").css("border", "1px solid #989899");
  });

  $(".b").click(function() {
    $(".innerframe").removeClass("gold offwhite pink");
    $(".innerframe").addClass("black");
    $(".screen").css("border", "1px solid #444");
  });

  $(".ow").click(function() {
    $(".innerframe").removeClass("gold black pink");
    $(".innerframe").addClass("offwhite");
    $(".screen").css("border", "1px solid #989899");
  });

  $(".p").click(function() {
    $(".innerframe").removeClass("gold black offwhite");
    $(".innerframe").addClass("pink");
    $(".screen").css("border", "1px solid #989899");
  });
});