'use strict';

  (function () {
    var FILE_TYPES = window.const.FILE_TYPES;
    var fileChooser = document.querySelector('.ad-form__field input[type=file]');
    var preview = document.querySelector('.ad-form-header__preview img');

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      })

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function(){
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    });

  })()