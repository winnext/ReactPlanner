var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../style/content-container";
import ContentTitle from "../style/content-title";
import CatalogItem from "./catalog-item";
import newItem from "./newItem";
import sandalye from "./sandalye";
import masa from "./masa";
import axios from "axios";

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
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      assetsList = _React$useState2[0],
      setAssetsList = _React$useState2[1];

  useEffect(function () {
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
    var temp = newItem(dumpAssets[index]);
    if (index === 0) {
      temp = sandalye(dumpAssets[index]);
    }
    if (index === 1) {
      temp = masa(dumpAssets[index]);
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

  return React.createElement(
    ContentContainer,
    { width: props.width, height: props.height },
    React.createElement(
      ContentTitle,
      null,
      "Assets"
    ),
    React.createElement(
      "div",
      { style: itemsStyle },
      assetsList.length !== 0 ? assetsList.map(function (elem) {
        return React.createElement(CatalogItem, { key: elem.name, element: elem });
      }) : React.createElement(
        "div",
        null,
        "Loading..."
      )
    )
  );
};

export default Assets;

Assets.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};

Assets.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};