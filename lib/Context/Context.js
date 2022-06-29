"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ContextProvider;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = exports.Context = _react2.default.createContext();

function ContextProvider(props) {
  var _React$useState = _react2.default.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  var _React$useState3 = _react2.default.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      select = _React$useState4[0],
      setSelect = _React$useState4[1];

  var _React$useState5 = _react2.default.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      popup = _React$useState6[0],
      setPopup = _React$useState6[1];

  (0, _react.useEffect)(function () {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) setPopup(false);
    });

    var temp = localStorage.getItem("data");
    if (temp) {
      setData(JSON.parse(temp));
    }
  }, []);

  return _react2.default.createElement(
    Context.Provider,
    { value: { data: { data: data, setData: setData }, popup: { open: popup, setOpen: setPopup }, select: { select: select, setSelect: setSelect } } },
    props.children
  );
}