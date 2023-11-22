jQuery.noConflict();
(function( $ ) {
  $(function() {
    // More code using $ as alias to jQuery
    $('button').click(function(){
        $('#exampleModal').modal('show');
    });
  });
})(jQuery);