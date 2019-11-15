'use strict';

(function () {
  var LIMIT_PHOTO = 16;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setFileUpload = function (fileChooser, onImageLoad) {

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var isValideType = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (isValideType) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          onImageLoad(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var avatarChooserElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview > img');
  var defaultPreviewSrc = avatarPreviewElement.src;

  var setAvatarPreview = function (reader) {
    avatarPreviewElement.src = reader;
  };

  var setDefaultPreview = function () {
    avatarPreviewElement.src = defaultPreviewSrc;
  };

  setFileUpload(avatarChooserElement, setAvatarPreview);

  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoChooserElement = document.querySelector('#images');
  var photoPreviewElement = document.querySelector('.ad-form__photo');
  var photoTemplateElement = document.querySelector('#photo').content;


  var setApartmentPhoto = function (reader) {
    var uploadedPhotoElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    var photoElement = photoTemplateElement.cloneNode(true);

    if (uploadedPhotoElements.length <= LIMIT_PHOTO) {
      photoPreviewElement.remove();
      photoElement.querySelector('#ad-form__img').src = reader;
      var blockFragment = document.createDocumentFragment();
      blockFragment.appendChild(photoElement);
      photoContainerElement.appendChild(blockFragment);
    }
  };

  setFileUpload(photoChooserElement, setApartmentPhoto);

  var resetUploadedFiles = function () {
    var uploadedPhotoElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    uploadedPhotoElements.forEach(function (item) {
      item.remove();
    });
    photoContainerElement.appendChild(photoPreviewElement);
  };

  window.uploadPhoto = {
    resetUploadedFiles: resetUploadedFiles,
    setDefaultPreview: setDefaultPreview
  };
})();
