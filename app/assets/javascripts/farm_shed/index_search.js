function IndexSearch(selector){
  //--- Used for URL-based searching ----------------------------
  //--- by Anysoft
  //--- https://anysoft.us
  //--- Jesse Farmer
  //--- jesse@anysoft.us


  //--- Initialize --------------------------------------------
  if(typeof selector === 'undefined'){ selector = 'body'; }
  // Box is the enclosing element
  this.box = $(selector);

  this.search_wrappers = this.box.find('[data-search="true"]');

  this.searcher_toggle = this.box.find('.searcher_toggle');
  //--- end Inintialize ----------------------------------------
  //



  this.getSearchKey = function(input){
    return input.closest('[data-search="true"]').attr('data-search-key');
  }

  this.search = function(remote){
    var keys = [];
    var terms = [];

    for(var i = 0; i < this.searchers.length; i++){
      var s = $(this.searchers[i]);

      var term = s.val();

      if(term.length > 0){
        var key = this.getSearchKey(s);
        keys.push(key);
        terms.push(term);
      }
    }

    var url = '?search_keys=' + keys.join(',') + '&search_terms=' + terms.join(',');

    if(typeof remote === 'undefined'){
      window.location = url;
    } else {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'script'
      });
    }
  }

  this.enableSearchLinking = function(){
    var t = this;
    var sel;
    for(var i = 0; i < this.searchers.length; i++){
      var s = $(this.searchers[i]);

      s.change(function(e){
        t.search(true);
      });
    }
  }

  this.buildCurrentSearch = function(){
    // this.current_search is used to hold information about the search params on the current request

    // Loc works with the window location. query() returns the query string as an object
    var q = new Loc().query();
    var keys = q.search_keys;
    var terms = q.search_terms;
    if(typeof keys != 'undefined'){
      // I keys exist.
      keys = keys.split(',');
      terms = terms.split(',');

      // Create current_search object
      this.current_search = {
            'keys': keys,
            'terms': terms
      }
    } else {
      // If no keys exist, set NULL
      this.current_search = false;
    }

    return this.current_search;
  }

  this.fillSearchers = function(){
    // Fill searchers with the values from current_search (from the query_string, origin).
    if(this.current_search){
      for(var i = 0; i < this.searchers.length; i++){
        var searcher = $(this.searchers[i]);
        var key = searcher.closest('[data-search="true"]').attr('data-search-key');

        for(var j = 0; j < this.current_search['keys'].length; j++){
          if(key === this.current_search['keys'][j]){
            searcher.val(this.current_search['terms'][j]);
          }
        }
      }
    }
  }

  this.buildSearchers = function(){
    var searchers = [];

    for(var i = 0; i < this.search_wrappers.length; i++){
      // for each container element, add an input.
      var s = $(this.search_wrappers[i]);

      var input = $('<input type="text" class="form-control searcher">');
      // input.css('opacity', 0.0);
      // Save input to array
      searchers.push(input);
      s.prepend(input);
    }

    // save inputs on the object
    this.searchers = searchers;

    this.enableSearchLinking();

    this.fillSearchers();
  }

  this.hideSearchers = function(speed){
    if(typeof speed === 'undefined'){ speed = 200; }

    this.searcher_toggle_on.hide();
    this.searcher_toggle_off.show();
    for(var i = 0; i < this.searchers.length; i++){
      $(this.searchers[i]).animate({
            'opacity': 0.0
      }, speed);
    }
  }

  this.showSearchers = function(speed){
    if(typeof speed === 'undefined'){ speed = 200; }

    this.searcher_toggle_on.show();
    this.searcher_toggle_off.hide();
    for(var i = 0; i < this.searchers.length; i++){

      $(this.searchers[i]).animate({
        'opacity': 1.0
      }, speed);
    }
  }

  this.buildSearcherToggle = function(){
    var t = this;
    var toggle = this.box.find('.searcher_toggle');

    this.searcher_toggle_off = $('<a href="off" class="glyphicon glyphicon-plus"></span>');
    this.searcher_toggle_on = $('<a href="on" class="glyphicon glyphicon-minus"></span>');

    toggle.append(this.searcher_toggle_off);
    toggle.append(this.searcher_toggle_on);

    this.searcher_toggle_off.click(function(e){
      e.preventDefault();
      t.showSearchers();
    });

    this.searcher_toggle_on.click(function(e){
      e.preventDefault();
      t.hideSearchers();
    });

    this.hideSearchers(0);
  }

  this.buildControls = function(){
    this.buildSearcherToggle();
  }

  this.init = function(){
    this.buildCurrentSearch();
    this.buildSearchers();
    this.buildControls();
  }
}
