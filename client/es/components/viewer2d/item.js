import React from 'react';
import PropTypes from 'prop-types';
// import {Context} from "../../Context/Context"
import If from '../../utils/react-if';

var STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

export default function Item(_ref) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene,
      catalog = _ref.catalog;


  // const context = React.useContext(Context)

  var x = item.x,
      y = item.y,
      rotation = item.rotation,
      visible = item.visible;


  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  var lineRef = React.useRef();

  // const onContextMenu = (e)=>{
  //   context.select.setSelect({id:item.id})
  //   context.popup.setOpen(true)
  // }
  return React.createElement(
    'g',
    {
      // onContextMenu={onContextMenu}
      ref: lineRef,
      'data-element-root': true,
      'data-prototype': item.prototype,
      'data-id': item.id,
      'data-selected': item.selected,
      'data-layer': layer.id,
      style: item.selected ? { cursor: "move" } : {},
      visibility: visible ? "visible" : "hidden",
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ')' },
    renderedItem,
    React.createElement(
      If,
      { condition: item.selected },
      React.createElement(
        'g',
        { 'data-element-root': true,
          'data-prototype': item.prototype,
          'data-id': item.id,
          'data-selected': item.selected,
          'data-layer': layer.id,
          'data-part': 'rotation-anchor'
        },
        React.createElement('circle', { cx: '0', cy: '150', r: '10', style: STYLE_CIRCLE }),
        React.createElement('circle', { cx: '0', cy: '0', r: '150', style: STYLE_CIRCLE2 })
      )
    )
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};