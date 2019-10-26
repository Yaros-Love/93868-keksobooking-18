'use strict';

(function () {
  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };
  Coordinate.prototype.setX = function (x) {
    this.x = x;
  };
  Coordinate.prototype.setY = function (y) {
    this.y = y;
  };

  window.coordinate = {
    Coordinate: Coordinate
  };
})();
