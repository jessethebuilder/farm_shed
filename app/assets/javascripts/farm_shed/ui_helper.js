function toggleClassOnHover(selector, klass){
  $(selector).hover(function(){
    $(this).addClass(klass);
  }, function(){
    $(this).removeClass(klass);
  });
}

function activateSectionToggler(box_selector, toggle_selector, content_selector){
	$(toggle_selector).click(function(e){
		e.preventDefault();

		if($(this).attr('href') === 'close_section'){
			$(this).closest(box_selector).find(content_selector).hide(400);
			$(this).attr('href', 'open_section').html('+');
		} else{
			$(this).closest(box_selector).find(content_selector).show(400);
			$(this).attr('href', 'close_section').html('-');
		}
	});
}

function activateSectionCloser(box_selector, toggle_selector, speed){
	speed = typeof speed !== 'undefined' ? speed : 400;
	$(toggle_selector).click(function(e){
		e.preventDefault();
		$(box_selector).hide(400);
	});
}
