function SortableTable(table_selector){
  var t = this;

  this.table = $(table_selector);
  this.all_headers = this.table.find('thead th');

  this.filter_inputs = [];
  this.sort_links = [];

  this.rows = this.table.find('tbody tr');
  this.filtered_rows = this.rows;

  // Create an array (sortable_columns) for all of the columns that are sortable. Here, any column
  // with no header text.
  this.headers = [];
  $.each(this.all_headers, function(i, header){
    var header = $(this);
    if(header.text() != ''){
      t.headers.push(header);
    }
  });

  //--- end Constructor -------------------------------------------------------

  this.filter = function(){
    var t = this;
    // Start over every time filter is called
    t.filtered_rows = [];

    var all_blank = true;

    $.each(this.filter_inputs, function(i, input){
      var input = $(this);
      var val = input.val();

      if(val != ''){
        all_blank = false;
        var test = input.val();
        var col_index;

        $.each(t.all_headers, function(j, header){
          // Find the input and return the index
          if($(header).closest('th').find('.filter_input')[0] == input[0]){
            col_index = j;
          }
        });

        t.filter_on_val(col_index, val, test);
      }
    });

    if(all_blank){
      this.filtered_rows = this.rows;
    }

    this.execute_filter();
  }

  this.filter_on_val = function(col_index, val, test){
    var t = this;
    var filtered = [];

    if(this.filtered_rows.length == 0){
      var rows = this.rows;
    } else {
      var rows = this.filtered_rows;
    }

    $.each(rows, function(i, row){
      var cells = $(row).find('td');

      var text = $(cells[col_index]).text();
      var reg = new RegExp(test, 'i');


      if(reg.test(text)){
        filtered.push($(row));
      }
    });

    t.filtered_rows = filtered;
  }

  this.execute_filter = function(){
    this.rows.hide();
    for(let i = 0; i < this.filtered_rows.length; i++){
      $(this.filtered_rows[i]).show();
    }
  }

  this.build_filters = function(){
    var t = this;

    $.each(t.headers, function(i, n){
      // Create an input for each sortable_column
      var header = $(this);
      var input_box = $('<div class="form-group sortable_table_filter_input"></div>');
      var input = $('<input type="text" name="' + header.text() + '" class="form-control filter_input" />');
      input_box.prepend(input);
      header.prepend(input_box);
      t.filter_inputs.push(input);
    });

    $.each(this.all_headers, function(i, header){
      // Normalize the width of all headers, so they don't jump around when input
      // is added.
      var w = $(this).width();
      $(this).css('width', w + 'px');
    });

    $.each(t.filter_inputs, function(i, filter_input){
      $(this).on('input', function(e){
        t.filter();
      });
    });
  }

  this.sort = function(link){
    var t = this;
    if(t.current_sort_link == link){
      t.sort_asc = !t.sort_asc;
    } else {
      t.sort_asc = true;
    }

    t.current_sort_link = link;

    var col_index;

    $.each(t.all_headers, function(i, header){
      // Find the input and return the index
      if($(header).closest('th').find('.sort_link')[0] == link[0]){
        col_index = i;
      }
    });
    //
    // if(t.sort_asc){
    //   link.append('<span class="glyphicon glyphicon-chevron-up"></span>');
    // }

    var rows = t.rows.sort(function(a, b){
      if(t.sort_asc){
        return $($(a).find('td')[col_index]).text().localeCompare($($(b).find('td')[col_index]).text(), 'en-US');
      } else {
        return $($(b).find('td')[col_index]).text().localeCompare($($(a).find('td')[col_index]).text(), 'en-US');
      }
    });

    t.table.find('tbody').html(rows);
  }

  this.build_sorters = function(){
    var t = this;

    $.each(t.headers, function(i, header){
      var h = $(this);
      var link = $('<a href="#" class="sort_link" />');
      link.text(h.text());
      h.html(link);
      t.sort_links.push(link);
    });

    $.each(t.sort_links, function(i, link){
      link.click(function(e){
        e.preventDefault();
        t.sort(link);
      });
    });
  }

  this.init = function(excluded_row_count){
    this.build_sorters();
    this.build_filters();
  }
}
