'use strict';

(function () {
  var LIMIT_PHOTO = 16;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setFileUpload = function (fileChooser, onImageLoad) {

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onImageLoad(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview > img');
  var defaultSrcPreview = avatarPreview.src;

  var setAvatarPreview = function (reader) {
    avatarPreview.src = reader;
  };

  var setDefaultPreview = function () {
    avatarPreview.src = defaultSrcPreview;
  };

  setFileUpload(avatarChooser, setAvatarPreview);

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoUpload = document.querySelector('#images');
  var blockPhoto = document.querySelector('.ad-form__photo');


  var setApartPhoto = function (reader) {
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

  setFileUpload(photoUpload, setApartPhoto);

  var resetUploadedFiles = function () {
    var uploadedPhotos = photoContainer.querySelectorAll('.ad-form__photo');
    uploadedPhotos.forEach(function (item) {
      item.remove();
    });
    photoContainer.appendChild(blockPhoto);
  };

  window.uploadPhoto = {
    resetUploadedFiles: resetUploadedFiles,
    setDefaultPreview: setDefaultPreview
  };
})();
