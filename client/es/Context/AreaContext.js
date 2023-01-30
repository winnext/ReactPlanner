var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from "react";
import Popup from "../components/popup/Popup";
import axios from "axios";

export var AreaContext = React.createContext();

export default function AreaContextProvider(props) {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      select = _React$useState4[0],
      setSelect = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      popup = _React$useState6[0],
      setPopup = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      showLayersColors = _React$useState8[0],
      setShowLayersColors = _React$useState8[1];

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      spaces = _useState2[0],
      setSpaces = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      links = _useState4[0],
      setLinks = _useState4[1];

  useEffect(function () {
    if (props.user.auth) {
      getLinksAndSpaces();
    }
  }, [props.user]);

  var getLinksAndSpaces = function getLinksAndSpaces() {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    axios.get("http://localhost:9001/space/" + key).then(function (res) {
      console.log(res.data);
      setLinks(res.data);
    });
    axios.post("http://localhost:3010/structures/lazyLoadingByKey", {
      key: key,
      leafType: "Floor",
      rootLabels: ["Floor"],
      childrenLabels: ["Space"]
    }).then(function (res) {
      console.log(res.data);
      setSpaces(res.data.children ? res.data.children : []);
    });
  };
  useEffect(function () {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) setPopup(false);
    });

    var temp = localStorage.getItem("data");
    if (temp) {
      setData(JSON.parse(temp));
    }

    var layerColorStorage = localStorage.getItem("layerColors");
    if (layerColorStorage) {
      setShowLayersColors(JSON.parse(layerColorStorage));
    }
  }, []);

  return React.createElement(
    AreaContext.Provider,
    {
      value: {
        data: { data: data, setData: setData },
        spaces: { spaces: spaces, setSpaces: setSpaces },
        links: { links: links, setLinks: setLinks },
        popup: { open: popup, setOpen: setPopup },
        select: { select: select, setSelect: setSelect },
        getLinksAndSpaces: getLinksAndSpaces,
        showLayersColors: { showLayersColors: showLayersColors, setShowLayersColors: setShowLayersColors }
      }
    },
    React.createElement(Popup, { state: props.state }),
    props.children
  );
}