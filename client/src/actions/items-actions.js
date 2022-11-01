import {
  SELECT_ITEM,
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
  SET_ITEMS_ITEM_ATTRIBUTES,
  BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM,
  BEGIN_ROTATING_ITEM,
  UPDATE_ROTATING_ITEM,
  END_ROTATING_ITEM,
  CREATE_ITEM
} from '../constants';

export function createItem(layerID, componentType, x, y, width, height, rotation) {
  return {
    type: CREATE_ITEM,
    layerID,
    componentType,
    x,
    y,
    width,
    height,
    rotation
  }
}

export function selectItem(layerID, itemID) {
  return {
    type: SELECT_ITEM,
    layerID,
    itemID
  }
}

export function setItemAttributes( itemID,layerID, attributes ) {
  return {
    type: SET_ITEMS_ITEM_ATTRIBUTES,
    itemID,
    layerID,
    attributes
  };
}

export function selectToolDrawingItem(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType
  }
}

export function updateDrawingItem(layerID, x, y) {
  return {
    type: UPDATE_DRAWING_ITEM,
    layerID, x, y
  }
}

export function endDrawingItem(layerID, x, y) {
  return {
    type: END_DRAWING_ITEM,
    layerID, x, y
  }
}

export function beginDraggingItem(layerID, itemID, x, y) {
  return {
    type: BEGIN_DRAGGING_ITEM,
    layerID, itemID, x, y
  }
}

export function updateDraggingItem(x, y) {
  return {
    type: UPDATE_DRAGGING_ITEM,
    x, y
  }
}

export function endDraggingItem(x, y) {
  return {
    type: END_DRAGGING_ITEM,
    x, y
  }
}

export function beginRotatingItem(layerID, itemID, x, y) {
  return {
    type: BEGIN_ROTATING_ITEM,
    layerID, itemID, x, y
  }
}

export function updateRotatingItem(x, y) {
  return {
    type: UPDATE_ROTATING_ITEM,
    x, y
  }
}

export function endRotatingItem(x, y) {
  return {
    type: END_ROTATING_ITEM,
    x, y
  }
}
