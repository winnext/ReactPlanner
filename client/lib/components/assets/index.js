"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _contentContainer = require("../style/content-container");

var _contentContainer2 = _interopRequireDefault(_contentContainer);

var _contentTitle = require("../style/content-title");

var _contentTitle2 = _interopRequireDefault(_contentTitle);

var _catalogItem = require("./catalog-item");

var _catalogItem2 = _interopRequireDefault(_catalogItem);

var _newItem = require("./newItem");

var _newItem2 = _interopRequireDefault(_newItem);

var _sandalye = require("./sandalye");

var _sandalye2 = _interopRequireDefault(_sandalye);

var _masa = require("./masa");

var _masa2 = _interopRequireDefault(_masa);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var itemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(14em, 1fr))",
  gridGap: "10px",
  marginTop: "1em"
};

var dumpAssets = [{
  image: "https://www.burotime.com/Uploads/teknikcizim/assist/AST-CHR-2-MF-3D-SL-PP_dim.png",
  height: 80,
  width: 60,
  name: "Sandalye"
}, {
  image: "https://www.freepnglogos.com/uploads/table-png/table-icon-download-icons-20.png",
  height: 50,
  width: 150,
  name: "Masa"
}, {
  image: "https://via.placeholder.com/100x100",
  height: 100,
  width: 100,
  name: "test2"
}, {
  image: "https://via.placeholder.com/100x100",
  height: 100,
  width: 100,
  name: "test3"
}];

var Assets = function Assets(props, context) {
  var _React$useState = _react2.default.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      assetsList = _React$useState2[0],
      setAssetsList = _React$useState2[1];

  (0, _react.useEffect)(function () {
    if (context.assets.elements.length === 0) {
      setTimeout(function () {
        test(0);
      }, 2000);
      setTimeout(function () {
        test(1);
      }, 4000);
      setTimeout(function () {
        test(2);
      }, 6000);
    } else {
      var assets = context.assets;
      var elementsToDisplay = assets ? assets.elements.filter(function (element) {
        return element.info.visibility ? element.info.visibility.catalog : true;
      }) : [];
      setAssetsList(elementsToDisplay);
    }
  }, []);

  var test = function test(index) {
    var temp = (0, _newItem2.default)(dumpAssets[index]);
    if (index === 0) {
      temp = (0, _sandalye2.default)(dumpAssets[index]);
    }
    if (index === 1) {
      temp = (0, _masa2.default)(dumpAssets[index]);
    }
    context.catalog.registerElement(temp);
    context.catalog.addToCategory("assets", temp);
    var assets = context.assets;
    var elementsToDisplay = assets ? assets.elements.filter(function (element) {
      return element.info.visibility ? element.info.visibility.catalog : true;
    }) : [];
    context.projectActions.initCatalog(context.catalog);
    setAssetsList(elementsToDisplay);
  };

  return _react2.default.createElement(
    _contentContainer2.default,
    { width: props.width, height: props.height },
    _react2.default.createElement(
      _contentTitle2.default,
      null,
      "Assets"
    ),
    _react2.default.createElement(
      "div",
      { style: itemsStyle },
      assetsList.length !== 0 ? assetsList.map(function (elem) {
        return _react2.default.createElement(_catalogItem2.default, { key: elem.name, element: elem });
      }) : _react2.default.createElement(
        "div",
        null,
        "Loading..."
      )
    )
  );
};

exports.default = Assets;


Assets.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object
};

Assets.contextTypes = {
  assets: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};