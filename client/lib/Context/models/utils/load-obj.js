'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadObjWithMaterial = loadObjWithMaterial;

var _mtlLoader = require('./mtl-loader');

var _mtlLoader2 = _interopRequireDefault(_mtlLoader);

var _objLoader = require('./obj-loader');

var _objLoader2 = _interopRequireDefault(_objLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadObjWithMaterial(mtlFile, objFile) {
  var imgPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var mtlLoader = new _mtlLoader2.default();
  mtlLoader.setTexturePath(imgPath);
  var url = mtlFile;
  return new Promise(function (resolve, reject) {

    mtlLoader.load(url, function (materials) {
      materials.preload();
      var objLoader = new _objLoader2.default();
      objLoader.setMaterials(materials);
      objLoader.load(objFile, function (object) {
        return resolve(object);
      });
    });
  });
}