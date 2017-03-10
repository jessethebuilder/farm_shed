var Loc = function(){
  this.base = window.location;

  this.q = function(){
    var search = this.base.search.replace('?', '');
    search = search.split('&');

    var val = {};

    for(var i = 0; i < search.length; i++){
      var s = search[i].split('=');
      val[s[0]] = s[1];
    }

    return val;
  };

  this.query = function(){
    return this.q();
  }
};
