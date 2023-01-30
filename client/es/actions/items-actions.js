import { SELECT_ITEM, SELECT_TOOL_DRAWING_ITEM, UPDATE_DRAWING_ITEM, END_DRAWING_ITEM, SET_ITEMS_ITEM_ATTRIBUTES, BEGIN_DRAGGING_ITEM, UPDATE_DRAGGING_ITEM, END_DRAGGING_ITEM, BEGIN_ROTATING_ITEM, UPDATE_ROTATING_ITEM, END_ROTATING_ITEM, CREATE_ITEM } from '../constants';

export function createItem(layerID, componentType, x, y, width, height, rotation) {
  var info = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};

  return {
    type: CREATE_ITEM,
    layerID: layerID,
    componentType: componentType,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: rotation,
    info: info
  };
}

export function selectItem(layerID, itemID) {
  return {
    type: SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}

export function setItemAttributes(itemID, layerID, attributes) {
  return {
    type: SET_ITEMS_ITEM_ATTRIBUTES,
    itemID: itemID,
    layerID: layerID,
    attributes: attributes
  };
}

export function selectToolDrawingItem(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType: sceneComponentType
  };
}

export function updateDrawingItem(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_ITEM,
    layerID: layerID, x: x, y: y
  };
}

export function endDrawingItem(layerID, x, y) {
  return {
    type: END_DRAWING_ITEM,
    layerID: layerID, x: x, y: y
  };
}

export function beginDraggingItem(layerID, itemID, x, y) {
  return {
    type: BEGIN_DRAGGING_ITEM,
    layerID: layerID, itemID: itemID, x: x, y: y
  };
}

export function updateDraggingItem(x, y) {
  return {
    type: UPDATE_DRAGGING_ITEM,
    x: x, y: y
  };
}

export function endDraggingItem(x, y) {
  return {
    type: END_DRAGGING_ITEM,
    x: x, y: y
  };
}

export function beginRotatingItem(layerID, itemID, x, y) {
  return {
    type: BEGIN_ROTATING_ITEM,
    layerID: layerID, itemID: itemID, x: x, y: y
  };
}

export function updateRotatingItem(x, y) {
  return {
    type: UPDATE_ROTATING_ITEM,
    x: x, y: y
  };
}

export function endRotatingItem(x, y) {
  return {
    type: END_ROTATING_ITEM,
    x: x, y: y
  };
}