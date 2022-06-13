import { Layer, Group } from './export';
import {
  IDBroker,
  NameGenerator
} from '../utils/export';
import { Map, fromJS } from 'immutable';

import {
  MODE_IDLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_ITEM,
  MODE_ROTATING_ITEM
} from '../constants';

class Item{

  static create( state, layerID, type, x, y, width, height, rotation ) {
    let itemID = IDBroker.acquireID();

    let item = state.catalog.factoryElement(type, {
      id: itemID,
      name: NameGenerator.generateName('items', state.catalog.getIn(['elements', type, 'info', 'title'])),
      type,
      height,
      width,
      x,
      y,
      rotation,
    });

    console.log(item)

    state = state.setIn(['scene', 'layers', layerID, 'items', itemID], item);

    return { updatedState: state, item };
  }

  static select( state, layerID, itemID ){
    state = Layer.select( state, layerID ).updatedState;
    state = Layer.selectElement( state, layerID, 'items', itemID ).updatedState;

    return {updatedState: state};
  }

  static remove( state, layerID, itemID ) {
    state = this.unselect( state, layerID, itemID ).updatedState;
    state = Layer.removeElement( state, layerID, 'items', itemID ).updatedState;

    state.getIn(['scene', 'groups']).forEach( group => state = Group.removeElement(state, group.id, layerID, 'items', itemID).updatedState );

    return { updatedState: state };
  }

  static unselect( state, layerID, itemID ) {
    state = Layer.unselect( state, layerID, 'items', itemID ).updatedState;

    return { updatedState: state };
  }

  static selectToolDrawingItem(state, sceneComponentType) {
    state = state.merge({
      mode: MODE_DRAWING_ITEM,
      drawingSupport: new Map({
        type: sceneComponentType
      })
    });

    return { updatedState: state };
  }

  static updateDrawingItem(state, layerID, x, y) {
    if (state.hasIn(['drawingSupport','currentID'])) {
      state = state.updateIn(['scene', 'layers', layerID, 'items', state.getIn(['drawingSupport','currentID'])], item => item.merge({x, y}));
    }
    else {
      let { updatedState: stateI, item } = this.create( state, layerID, state.getIn(['drawingSupport','type']), x, y, 200, 100, 0);
      state = Item.select( stateI, layerID, item.id ).updatedState;
      state = state.setIn(['drawingSupport','currentID'], item.id);
    }

    return { updatedState: state };
  }

  static endDrawingItem(state, layerID, x, y) {
    let catalog = state.catalog;
    state = this.updateDrawingItem(state, layerID, x, y, catalog).updatedState;
    state = Layer.unselectAll( state, layerID ).updatedState;
    state =  state.merge({
      drawingSupport: Map({
        type: state.drawingSupport.get('type')
      })
    });
    return { updatedState: state };
  }

  static beginDraggingItem(state, layerID, itemID, x, y) {

    let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

    state = state.merge({
      mode: MODE_DRAGGING_ITEM,
      draggingSupport: Map({
        layerID,
        itemID,
        startPointX: x,
        startPointY: y,
        originalX: item.x,
        originalY: item.y
      })
    });

    return { updatedState: state };
  }

  static updateDraggingItem(state, x, y) {
    let {draggingSupport, scene} = state;

    let layerID = draggingSupport.get('layerID');
    let itemID = draggingSupport.get('itemID');
    let startPointX = draggingSupport.get('startPointX');
    let startPointY = draggingSupport.get('startPointY');
    let originalX = draggingSupport.get('originalX');
    let originalY = draggingSupport.get('originalY');

    let diffX = startPointX - x;
    let diffY = startPointY - y;

    let item = scene.getIn(['layers', layerID, 'items', itemID]);
    item = item.merge({
      x: originalX - diffX,
      y: originalY - diffY
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
    });

    return { updatedState: state };
  }
  
  static endDraggingItem(state, x, y) {
    function pointIsInPoly(p, polygon) {
      var isInside = false;
      var minX = polygon[0].x, maxX = polygon[0].x;
      var minY = polygon[0].y, maxY = polygon[0].y;
      for (var n = 1; n < polygon.length; n++) {
          var q = polygon[n];
          minX = Math.min(q.x, minX);
          maxX = Math.max(q.x, maxX);
          minY = Math.min(q.y, minY);
          maxY = Math.max(q.y, maxY);
      }
  
      if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
          return false;
      }
  
      var i = 0, j = polygon.length - 1;
      for (i, j; i < polygon.length; j = i++) {
          if ( (polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                  p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
              isInside = !isInside;
          }
      }
  
      return isInside;
    }
  
    function point(x,y){
      return {x,y}
    }

    let itemID = state.draggingSupport.get('itemID');
    let layerID = state.draggingSupport.get('layerID');
    let originalX = state.draggingSupport.get('originalX');
    let originalY = state.draggingSupport.get('originalY');
    const {layers} = state.scene.toJS()
    let {x:lastX,y:lastY} = layers[layerID].items[itemID];
    let areas = layers[layerID].areas
    let layer = layers[layerID]
    console.log(originalX,originalY)
    console.log(lastX,lastY)
    // console.log(layers)
    // console.log(areas)
    let startArea
    let endArea
    for(let item in areas){
      
      console.log(item)
      let polygon = []
      for(let vertex of areas[item].vertices){
        polygon.push(point(layer.vertices[vertex].x,layer.vertices[vertex].y))
      }
      if(pointIsInPoly({x:originalX,y:originalY},polygon)){
        startArea = item
      }
      if(pointIsInPoly({x:lastX,y:lastY},polygon)){
        endArea = item
      }
      console.log(pointIsInPoly({x:lastX,y:lastY},polygon))
    }
    if(startArea !== endArea){
      let inp = confirm("Are you sure?")
      if(!inp){
        state = this.updateDraggingItem(state, originalX, originalY).updatedState;
        state = state.merge({ mode: MODE_IDLE });
        return {updatedState:state}
      }
    }

    state = this.updateDraggingItem(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static beginRotatingItem(state, layerID, itemID, x, y) {
    state = state.merge({
      mode: MODE_ROTATING_ITEM,
      rotatingSupport: Map({
        layerID,
        itemID
      })
    });

    return { updatedState: state };
  }

  static updateRotatingItem(state, x, y) {
    let {rotatingSupport, scene} = state;

    let layerID = rotatingSupport.get('layerID');
    let itemID = rotatingSupport.get('itemID');
    let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

    let deltaX = x - item.x;
    let deltaY = y - item.y;
    let rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

    if (-5 < rotation && rotation < 5) rotation = 0;
    if (-95 < rotation && rotation < -85) rotation = -90;
    if (-185 < rotation && rotation < -175) rotation = -180;
    if (85 < rotation && rotation < 90) rotation = 90;
    if (-270 < rotation && rotation < -265) rotation = 90;

    item = item.merge({
      rotation,
    });

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
    });

    return { updatedState: state };
  }

  static endRotatingItem(state, x, y) {
    state = this.updateRotatingItem(state, x, y).updatedState;
    state = state.merge({ mode: MODE_IDLE });

    return { updatedState: state };
  }

  static setProperties( state, layerID, itemID, properties ) {
    state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties'], properties);

    return { updatedState: state };
  }

  static setJsProperties( state, layerID, itemID, properties ) {
    return this.setProperties( state, layerID, itemID, fromJS(properties) );
  }

  static updateProperties( state, layerID, itemID, properties) {
    properties.forEach( ( v, k ) => {
      if( state.hasIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k]) )
        state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k], v);
    });

    return { updatedState: state };
  }

  static updateJsProperties( state, layerID, itemID, properties) {
    return this.updateProperties( state, layerID, itemID, fromJS(properties) );
  }

  static setAttributes( state, layerID, itemID, itemAttributes) {
    state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID], itemAttributes);
    return { updatedState: state };
  }

  static setJsAttributes( state, layerID, itemID, itemAttributes) {
    itemAttributes = fromJS(itemAttributes);
    return this.setAttributes(state, layerID, itemID, itemAttributes);
  }

}

export { Item as default };
