function addAssociatedFields(selector, association, content){
	var new_id = new Date().getTime();
	var regex = new RegExp("new_" + association, "g");
	$(selector).prepend(content.replace(regex, new_id));
}

function limitFieldInputByKeypress(selector, test, break_points, delimiter, max_length){
  /* Test is a regular expression, break_points are an array of
     Integers signifying when to add the delimiter. */
  var fields = jQuery(selector);
  for(var i = 0; i < fields.length; i++){
    var field = jQuery(fields[i]);

    field.keypress(function(e){
      var k = e.key;
      if(test.test(k)){
        var t = jQuery(this);
        var len = t.val().length;

        for(var j = 0; j < break_points.length; j++){
          if(len == break_points[j]){
            t.val(t.val() + delimiter);
            break;
          }
        }

      //  console.log(t[0].selectionStart + ':' + t[0].selectionEnd);

        if(len == max_length){
          // Determine if a selection has been made, which would replace characters,
          // on keypress. Not add them.

          var dif = t[0].selectionEnd - t[0].selectionStart;
          if(dif == 0){
            e.preventDefault();

          }

        }
      } else {
        e.preventDefault();
      }
    });
  }
}

function limitZipInputs(selector){
	if(typeof selector == 'undefined'){ selector = '.zip'; }
	limitFieldInputByKeypress(selector, /\d/, [5], '-', 10);
}
