function AjaxFileUploads(files_selector, base_url, complete_callback){
  // base_url is used for routing. Assumes basic, Restful (railsy) routing.
  // Hack base_url thoroughout code if you need different routes.
  this.base_url = base_url;

  this.complete = function(){
    // once all files have been uploaded
    complete_callback();
  }

  this.upload_count = 0;

  this.files = [];

  this.getImageFiles = function(){
    return $(files_selector)[0].files;
  };

  this.feedback = function(message){
    $('#ajax_file_upload_feedback').text(message);
  }

  this.getFiles = function(){
    // Reads all the file as data_uris, and stores them in an array.
    // Returns fullfiled promise once all the files are stored in the array.
    var t = this;

    return new Promise(function(fullfill, reject){
      t.feedback('Reading image files');

      var image_files = t.getImageFiles();

      $.each(image_files, function(i, file){
        // create a reader for every image file
        var reader = new FileReader();

        reader.onload = function(e){
          // once reader.readAsDataURL() (below) completes,
          // save filename and image data to a hash
          var o = {};
          o.name = file.name;
          o.data = e.target.result;
          t.files.push(o);

          if(t.files.length == image_files.length){
            // Once every file has been added to the this.files array, return promise
            fullfill();
          }
        };

        // Read file, trigger reader.onload once file is loaded.
        reader.readAsDataURL(file);
      });
    });
  }

  this.postFile = function(image_data, name){
    var t = this;

    return new Promise(function(fullfill, reject){
      $.ajax({
        url: '/' + base_url + '.json',
        method: 'POST',
        data: {
            // The base_url.json POST needs accept an image parameter, and a
            // name parameter. This can be easily hacked to suit your needs.
            image: image_data,
            name: name
          }
        },
        success: function(){
          t.upload_count += 1;
          fullfill();
        }
      });
    });
  }

  this.postFiles = function(){
    var t = this;

    $.each(t.files, function(i, file){
      t.postFile(file.data, file.name).then(function(){
        // If all files uploaded.
        if(t.upload_count === t.files.length){
          t.feedback("All Uploads Complete!");
          // Call complete callback.
          t.complete();
        } else {
          t.feedback("Uploaded " + t.upload_count + " Images.");
        }
      });
    });
  }

  this.start = function(){
    // Initiate upload. Probably on a click, blur, or change event
    var t = this;
    t.getFiles().then(function(){
      // Build image files (which also inlcude text files, at this point)
      // and upload one at a time.
      t.postFiles();
    });
  }
}
