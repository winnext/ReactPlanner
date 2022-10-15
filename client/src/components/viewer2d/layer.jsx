import React from 'react';
import PropTypes from 'prop-types';
import {
  Line,
  Area,
  Vertex,
  Item,
  Group
} from './export';
import {AreaContext} from "../../Context"
export default function Layer({ layer, scene, catalog }) {

  let { unit, groups,width,height, } = scene;
  let { lines, areas, vertices, holes, id: layerID, items, opacity,color } = layer;

  const context = React.useContext(AreaContext)


  return (
    <g opacity={opacity} className={(context.showLayersColors.showLayersColors && color) ? "colorize" : ""} style={context.showLayersColors.showLayersColors ? {'--color':color }:{}} >
      {/* <path fill={color} opacity={opacity/2} d={`M 0 0 L 0 ${height} L ${width} ${height} L ${width} 0`} /> */}
      {
        areas.valueSeq().map(area =>
          <Area key={area.id} layer={layer} area={area} unit={unit} catalog={catalog} />)
      }
      {
        lines.valueSeq().map(line =>
          <Line key={line.id} layer={layer} line={line} scene={scene} catalog={catalog} />)
      }
      {
        items.valueSeq().map(item =>
          <Item key={item.id} layer={layer} item={item} scene={scene} catalog={catalog} />)
      }
      {
        vertices
          .valueSeq()
          .filter(v => v.selected)
          .map(vertex => <Vertex key={vertex.id} layer={layer} vertex={vertex} />)
      }
      {
        groups
          .valueSeq()
          .filter(g => g.hasIn(['elements', layerID]) && g.get('selected'))
          .map(group => <Group key={group.get('id')} layer={layer} group={group} scene={scene} catalog={catalog} />)
      }
    </g>
  );

}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
