function BootstrapRailsForm(form_selector){
  // Recognizes a number of classes. Use on form fields to specify functionality
  // - .req = required
  // - .ssn = Social Security Number
  // - .cash = Cash (US)

  this.form = $(form_selector);

  //--- Getters ---------------------------------------
  this.get_labels = function(){
    return this.form.find('label');
  }

  this.get_text_fields = function(){
    return this.form.find('input[type="text"]');
  }

  this.get_phone_fields = function(){
    return this.form.find('input[type="tel"]');
  }

  this.get_date_fields = function(){
    return this.form.find('input[type="date"]');
  }

  //--- Methods ------------------------------------------
  this.addBootstrapFormClasses = function(){
    this.get_labels().addClass('control-label');
    // refactor each field type as a property above
    this.form.find('input[type="email"], input[type="number"], select, textarea').addClass('form-control');
    this.get_date_fields().addClass('form-control');
    this.get_text_fields().addClass('form-control');
    this.get_phone_fields().addClass('form-control');
  }

  this.requireFormFields = function(){
    var requireds = this.form.find('.req');

    for(var i = 0; i < requireds.length; i++){
      var req = $(requireds[i]);
      req.attr('required', true);

      var label = req.closest('.form-group').find('.control-label');
      label.addClass('req_label');
    }

  }

  this.autoFormatPhoneFields =  function(){
    var phones = this.get_phone_fields();

    for(var i = 0; i < phones.length; i++){
      var p = $(phones[i]);
      p.keypress(function(e){
        if(e.keyCode == 9 || e.keyCode == 8){ return; }

        var key = e.key;
        if(/\d/.test(key)){
          // if key is a number
          var t = $(this);
          var len = t.val().length;

          if(len == 3 || len == 7){
            t.val(t.val() + '-');
          }

          if(len == 12){
            e.preventDefault();
          }
        } else {
          // if key is not a number, do nothing
          e.preventDefault();
        }
      });
    }
  }

  this.autoFormatSSNFields = function(){
    var ssns = this.form.find('.ssn');

    for(var i = 0; i < ssns.length; i++){
      var s = $(ssns[i]);
      s.attr('placeholder', "xx-xxx-xxxx")
      s.keypress(function(e){
        if(e.keyCode == 9 || e.keyCode == 8){ return; }


        var key = e.key;

        if(/\d/.test(key)){
          // if key is a number
          var t = $(this);
          var len = t.val().length;

          if(len == 3 || len == 6){
            t.val(t.val() + '-');
          }

          if(len == 11){
            e.preventDefault();
          }
        } else {
          // if key is not a number, do nothing
          e.preventDefault();
        }
      });
    }
  }

  this.autoFormatZipFields = function(){
    var zips = this.form.find('.zip');

    for(var i = 0; i < zips.length; i++){
      var z = $(zips[i]);
      z.keypress(function(e){
        if(e.keyCode == 9 || e.keyCode == 8){ return; }


        var key = e.key;

        if(/\d/.test(key)){
          // if key is a number
          var t = $(this);
          var len = t.val().length;

          if(len == 5){
            t.val(t.val() + '-');
          }

          if(len == 10){
            e.preventDefault();
          }
        } else {
          // if key is not a number, do nothing
          e.preventDefault();
        }
      });
    }
  }

  this.autoFormatCashFields = function(){
    var cashes = this.form.find('.cash');

    for(var i = 0; i < cashes.length; i++){
      var cash = $(cashes[i]);

      cash.keypress(function(e){
        // if tab is pressed, move on. This is for Firefox
        if(e.keyCode == 9 || e.keyCode == 8){ return; }

        var key = e.key;
        if(!/[0-9.]/.test(key)){
          // if not a number of a period (.)
          e.preventDefault();
        } else {
          // if value is not a number and optionally a decimial
          // and optionally 1 or 2 numbers

          var val = $(this).val() + key;
          if(val.length > 0 && !/^\d+\.?\d{0,2}$/.test(val)){
            e.preventDefault();
          }
        }
      });
    }
  }

  this.all = function(){
    // entry point
    this.addBootstrapFormClasses();
    this.requireFormFields();
    this.autoFormatPhoneFields();
    this.autoFormatSSNFields();
    this.autoFormatCashFields();
    this.autoFormatZipFields();
    // this.formatDateFieldsForRails();
  }
}
