var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AreaContext } from "../../Context";
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Slide, InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";

var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, _extends({ direction: "up", ref: ref }, props));
});
export default function Popup(props, context2) {
  var context = React.useContext(AreaContext);

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      space = _React$useState2[0],
      setSpace = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      spaces = _React$useState4[0],
      setSpaces = _React$useState4[1];

  var handleChange = function handleChange(event) {
    setSpace(event.target.value);
  };

  React.useEffect(function () {
    setSpace("");
    setSpaces([]);
    console.log(context.spaces);
    context.spaces.spaces.forEach(function (item) {
      var temp = context.links.links.find(function (link) {
        return link.spaceKey === item.key;
      });
      if (!temp) {
        setSpaces(function (prev) {
          return [].concat(_toConsumableArray(prev), [item]);
        });
      }
    });

    var areaLink = context.links.links.find(function (i) {
      return i.areaKey === context.select.select.id;
    });
    var areaSpace = areaLink && context.spaces.spaces.find(function (i) {
      return i.key === areaLink.spaceKey;
    });
    if (areaLink && areaSpace) {
      setSpaces(function (prev) {
        return [].concat(_toConsumableArray(prev), [areaSpace]);
      });
      setSpace(areaLink.spaceKey);
    }
  }, [context.popup.open]);

  var Save = function Save() {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    if (context.select.select) {
      axios.post("http://localhost:9001/space", {
        planKey: key,
        spaceKey: space,
        areaKey: context.select.select.id
      }).then(function (res) {
        console.log(res.data);
        setSpace("");
        context.getLinksAndSpaces();
        context.popup.setOpen(false);
      });
    }
  };

  var GetComponents = function GetComponents() {
    var areaLink = context.links.links.find(function (i) {
      return i.areaKey === context.select.select.id;
    });
    var areaSpace = areaLink && context.spaces.spaces.find(function (i) {
      return i.key === areaLink.spaceKey;
    });
    if (areaLink && areaSpace) {
      axios.post("http://localhost:3014/component" + "/advancedSearch/" + ("?page=" + 1 + "&limit=" + 10 + "&orderBy=" + "DESC" + "&orderByColumn="), [{
        relationName: "LOCATED_IN",
        labels: ["Virtual", "FacilityStructure"],
        filters: { isDeleted: false, id: areaSpace.id.toString() }
      }]).then(function (res) {
        console.log(res.data);
        console.log(context2);
        var layerID = "layer-1";
        var areaID = areaLink.areaKey;
        var area = props.state.getIn(["scene", "layers", layerID, "areas", areaID]);
        var x = Infinity;
        var y = -Infinity;
        area.vertices.forEach(function (vertexID) {
          var vertice = props.state.getIn(["scene", "layers", layerID, "vertices", vertexID]);
          if (vertice.x <= x) {
            x = vertice.x;
          }
        });
        area.vertices.forEach(function (vertexID) {
          var vertice = props.state.getIn(["scene", "layers", layerID, "vertices", vertexID]);
          if (vertice.x === x) {
            if (vertice.y >= y) {
              y = vertice.y;
            }
          }
        });
        x += 10;
        y -= 10;

        var _loop = function _loop(item) {
          axios.get("http://localhost:3014/component" + "/identifier/" + item.id).then(function (itemInfo) {
            axios.get("http://localhost:3014/types/identifier/" + itemInfo.data.properties.type.toString()).then(function (typeInfo) {
              var asset = context2.assets.elements.find(function (i) {
                return i.info.key === typeInfo.data.properties.key;
              });
              console.log("asset", asset);
              context2.itemsActions.createItem("layer-1", asset.name, x, y, 200, 100, 0, item);
            });
          });
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.data.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            _loop(item);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  };

  return React.createElement(
    Dialog,
    {
      open: context.popup.open,
      TransitionComponent: Transition,
      keepMounted: true,
      onClose: function onClose() {
        return context.popup.setOpen(false);
      }
    },
    React.createElement(
      DialogTitle,
      null,
      context.select.select && "Area Id: " + context.select.select.id
    ),
    React.createElement(
      DialogContent,
      null,
      React.createElement(
        Button,
        { onClick: GetComponents },
        "Get Components"
      ),
      React.createElement(
        Box,
        { sx: { p: 2 } },
        React.createElement(
          FormControl,
          { fullWidth: true },
          React.createElement(
            InputLabel,
            { id: "demo-simple-select-label" },
            "Space"
          ),
          React.createElement(
            Select,
            {
              labelId: "demo-simple-select-label",
              id: "demo-simple-select",
              value: space,
              label: "Select Space",
              onChange: handleChange
            },
            React.createElement(
              MenuItem,
              { value: "" },
              "Empty"
            ),
            spaces.map(function (item) {
              return React.createElement(
                MenuItem,
                { key: item.key, value: item.key },
                item.name
              );
            })
          )
        )
      )
    ),
    React.createElement(
      DialogActions,
      null,
      React.createElement(
        Button,
        { onClick: function onClick() {
            return context.popup.setOpen(false);
          } },
        "Cancel"
      ),
      React.createElement(
        Button,
        { onClick: Save },
        "Save"
      )
    )
  );
}

Popup.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired
};