function HashScroller(top_elements){
  // top_elements is an array of element selectors that should appear above the
  // scrolled to element.
  this.top_elements = top_elements;

  this.topHeight = function(){
    var height = 0.0;
    for(var i = 0; i < top_elements.length; i++){
      height += $(top_elements[i]).height();
    }

    return height;
  } // topHeight()

  this.move = function(){
    var selector = window.location.hash;
    if(selector){
      var targ = $(selector);
      var top = targ.position().top - this.topHeight();

      var current_top = $('body').scrollTop();
      // console.log(current_top);

      $('html, body').scrollTop(0);

      $('html, body').animate({
        scrollTop: top
      }, 500);
    }
  }

  this.init = function(){
    var t = this;
    $(window).on('hashchange', function(e){
      e.preventDefault();
      t.move();
      return false;
    });

    t.move();
  }
}
