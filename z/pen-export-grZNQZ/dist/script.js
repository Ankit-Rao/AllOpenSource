$(function() {
    $( "div.element" ).draggable({ 
      revert: true, 
      helper: "clone",
    })
  
    $( "div.titem" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "dropped" )
          .html("<button class='remove'><i class='icon-remove-sign'></i></button>");
      }
    })
  });

$('div.dropped').click(function() {
  alert('Stop!');
});

$('div.element').hover(function() {
  $('div.element').removeClass('selected');
  $(this).addClass('selected');
});