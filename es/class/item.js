var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Layer, Group } from './export';
import { IDBroker, NameGenerator, point, pointIsInPoly } from '../utils/export';
import { Map, fromJS } from 'immutable';

import { MODE_IDLE, MODE_DRAWING_ITEM, MODE_DRAGGING_ITEM, MODE_ROTATING_ITEM } from '../constants';

var Item = function () {
  function Item() {
    _classCallCheck(this, Item);
  }

  _createClass(Item, null, [{
    key: 'create',
    value: function create(state, layerID, type, x, y, width, height, rotation) {
      var itemID = IDBroker.acquireID();

      var item = state.catalog.factoryElement(type, {
        id: itemID,
        name: NameGenerator.generateName('items', state.catalog.getIn(['elements', type, 'info', 'title'])),
        type: type,
        height: height,
        width: width,
        x: x,
        y: y,
        rotation: rotation
      });

      console.log(item);

      state = state.setIn(['scene', 'layers', layerID, 'items', itemID], item);

      return { updatedState: state, item: item };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, itemID) {
      state = Layer.select(state, layerID).updatedState;
      state = Layer.selectElement(state, layerID, 'items', itemID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, itemID) {
      state = this.unselect(state, layerID, itemID).updatedState;
      state = Layer.removeElement(state, layerID, 'items', itemID).updatedState;

      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = Group.removeElement(state, group.id, layerID, 'items', itemID).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, itemID) {
      state = Layer.unselect(state, layerID, 'items', itemID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'selectToolDrawingItem',
    value: function selectToolDrawingItem(state, sceneComponentType) {
      state = state.merge({
        mode: MODE_DRAWING_ITEM,
        drawingSupport: new Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingItem',
    value: function updateDrawingItem(state, layerID, x, y) {
      if (state.hasIn(['drawingSupport', 'currentID'])) {
        state = state.updateIn(['scene', 'layers', layerID, 'items', state.getIn(['drawingSupport', 'currentID'])], function (item) {
          return item.merge({ x: x, y: y });
        });
      } else {
        var _create = this.create(state, layerID, state.getIn(['drawingSupport', 'type']), x, y, 200, 100, 0),
            stateI = _create.updatedState,
            item = _create.item;

        state = Item.select(stateI, layerID, item.id).updatedState;
        state = state.setIn(['drawingSupport', 'currentID'], item.id);
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingItem',
    value: function endDrawingItem(state, layerID, x, y) {
      var catalog = state.catalog;
      state = this.updateDrawingItem(state, layerID, x, y, catalog).updatedState;
      state = Layer.unselectAll(state, layerID).updatedState;
      state = state.merge({
        drawingSupport: Map({
          type: state.drawingSupport.get('type')
        })
      });
      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingItem',
    value: function beginDraggingItem(state, layerID, itemID, x, y) {

      var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

      state = state.merge({
        mode: MODE_DRAGGING_ITEM,
        draggingSupport: Map({
          layerID: layerID,
          itemID: itemID,
          startPointX: x,
          startPointY: y,
          originalX: item.x,
          originalY: item.y
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingItem',
    value: function updateDraggingItem(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport,
          scene = _state.scene;


      var layerID = draggingSupport.get('layerID');
      var itemID = draggingSupport.get('itemID');
      var startPointX = draggingSupport.get('startPointX');
      var startPointY = draggingSupport.get('startPointY');
      var originalX = draggingSupport.get('originalX');
      var originalY = draggingSupport.get('originalY');

      var diffX = startPointX - x;
      var diffY = startPointY - y;

      var item = scene.getIn(['layers', layerID, 'items', itemID]);
      item = item.merge({
        x: originalX - diffX,
        y: originalY - diffY
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingItem',
    value: function endDraggingItem(state, x, y) {

      var itemID = state.draggingSupport.get('itemID');
      var layerID = state.draggingSupport.get('layerID');
      var originalX = state.draggingSupport.get('originalX');
      var originalY = state.draggingSupport.get('originalY');

      var _state$scene$toJS = state.scene.toJS(),
          layers = _state$scene$toJS.layers;

      var _layers$layerID$items = layers[layerID].items[itemID],
          lastX = _layers$layerID$items.x,
          lastY = _layers$layerID$items.y;

      var areas = layers[layerID].areas;
      var layer = layers[layerID];
      console.log(originalX, originalY);
      console.log(lastX, lastY);
      // console.log(layers)
      // console.log(areas)
      var startArea = void 0;
      var endArea = void 0;
      for (var item in areas) {

        console.log(item);
        var polygon = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = areas[item].vertices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var vertex = _step.value;

            // console.log(layer.vertices[vertex].x,layer.vertices[vertex].y)
            polygon.push(point(layer.vertices[vertex].x, layer.vertices[vertex].y));
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

        if (pointIsInPoly(point(originalX, originalY), polygon)) {
          startArea = item;
        }
        if (pointIsInPoly(point(lastX, lastY), polygon)) {
          endArea = item;
        }
        console.log(pointIsInPoly(point(lastX, lastY), polygon));
      }
      if (startArea !== endArea) {
        var inp = confirm("Are you sure?");
        if (!inp) {
          state = this.updateDraggingItem(state, originalX, originalY).updatedState;
          state = state.merge({ mode: MODE_IDLE });
          return { updatedState: state };
        }
      }

      state = this.updateDraggingItem(state, x, y).updatedState;
      state = state.merge({ mode: MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginRotatingItem',
    value: function beginRotatingItem(state, layerID, itemID, x, y) {
      state = state.merge({
        mode: MODE_ROTATING_ITEM,
        rotatingSupport: Map({
          layerID: layerID,
          itemID: itemID
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateRotatingItem',
    value: function updateRotatingItem(state, x, y) {
      var _state2 = state,
          rotatingSupport = _state2.rotatingSupport,
          scene = _state2.scene;


      var layerID = rotatingSupport.get('layerID');
      var itemID = rotatingSupport.get('itemID');
      var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

      var deltaX = x - item.x;
      var deltaY = y - item.y;
      var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

      if (-5 < rotation && rotation < 5) rotation = 0;
      if (-95 < rotation && rotation < -85) rotation = -90;
      if (-185 < rotation && rotation < -175) rotation = -180;
      if (85 < rotation && rotation < 90) rotation = 90;
      if (-270 < rotation && rotation < -265) rotation = 90;

      item = item.merge({
        rotation: rotation
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endRotatingItem',
    value: function endRotatingItem(state, x, y) {
      state = this.updateRotatingItem(state, x, y).updatedState;
      state = state.merge({ mode: MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, itemID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties'], properties);

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, itemID, properties) {
      return this.setProperties(state, layerID, itemID, fromJS(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, itemID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, itemID, properties) {
      return this.updateProperties(state, layerID, itemID, fromJS(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, itemID, itemAttributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID], itemAttributes);
      return { updatedState: state };
    }
  }, {
    key: 'setJsAttributes',
    value: function setJsAttributes(state, layerID, itemID, itemAttributes) {
      itemAttributes = fromJS(itemAttributes);
      return this.setAttributes(state, layerID, itemID, itemAttributes);
    }
  }]);

  return Item;
}();

export { Item as default };