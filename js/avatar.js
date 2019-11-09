'use strict';

(function () {
  var uploadFile = function (fileChooser, func) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          func(reader.result);
        });

        reader.readAsDataURL(file);
      } else {
        alert('Выберете файл из предложенного формата: ' + FILE_TYPES.join(', '));
      }
    });
  };

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var preview = avatarPreview.querySelector('img');
  var defaultSrcPreview = preview.src;
  var setAvatarPreview = function (reader) {
    preview.src = reader;
  };

  uploadFile(avatarChooser, setAvatarPreview);

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoUpload = document.querySelector('#images');
  var blockPhoto = document.querySelector('.ad-form__photo');

  var setApartPhoto = function (reader) {
    var LIMIT_PHOTO = 16;

    var uploadedPhotos = photoContainer.querySelectorAll('.ad-form__photo');
    var photoTemplate = document.querySelector('#photo').content;
    var photoElement = photoTemplate.cloneNode(true);

    if (uploadedPhotos.length <= LIMIT_PHOTO) {
      blockPhoto.remove();
      photoElement.querySelector('#ad-form__img').src = reader;
      var blockFragment = document.createDocumentFragment();
      blockFragment.appendChild(photoElement);
      photoContainer.appendChild(blockFragment);
    }
  };

  uploadFile(photoUpload, setApartPhoto);

  var resetUploadedFiles = function () {
    var uploadedPhotos = photoContainer.querySelectorAll('.ad-form__photo');
    uploadedPhotos.forEach(function (item) {
      item.remove();
    });
    photoContainer.appendChild(blockPhoto);

    preview.src = defaultSrcPreview;
  };

  window.avatar = {
    preview: preview,
    defaultSrcPreview: defaultSrcPreview,
    resetUploadedFiles: resetUploadedFiles
  };
})();
