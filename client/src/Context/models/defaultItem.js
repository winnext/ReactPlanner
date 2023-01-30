import React from 'react';
import { BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper } from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';

export default (props)=>({
  name: props.name,
  prototype: 'items',

  info: {
    title: props.name,
    tag: [props.name],
    description: props.name,
    image: props.image,
    key: props.key,
  },

  properties: {
    color: {
      label: 'Color',
      type: 'color',
      defaultValue: ReactPlannerSharedStyle.AREA_MESH_COLOR.unselected
    },
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: parseInt(props.width),
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: parseInt(props.height),
        unit: 'cm'
      }
    },
  },

  render2D: (element, layer, scene) => {
    let style = {
      stroke: !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED,
      strokeWidth: 2,
      fill: element.properties.get('color')
    };

    let w = element.properties.getIn(['width', 'length']);
    let d = element.properties.getIn(['depth', 'length']);
    let w2 = w / 2;
    let d2 = d / 2;

    let angle = element.rotation + 90;
    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }
    let image = undefined
    if(element.info.images){
      let images = element.info.images === "" ? [] : JSON.parse(element.info.images)
      image = images.find(i=>i.main === true) || images[0]
    }
    image = image || props.image;
    return (
      <g transform={`translate(-${w2}, -${d2})`}>
        <rect x="0" y="0" width={w} height={d} style={style} />
        {image ? <image key='2' x='0' y='0' width={w} height={d} preserveAspectRatio="none"  transform={`translate(0, ${d}) scale(1,-1) rotate(${textRotation})`} href={props.image}/>:null}
        <text key='3' x='0' y='0'
              transform={`translate(${w / 2}, ${d / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: 'middle', fontSize: '11px',opacity:0.3}}>
          {element.type}
        </text>
      </g>
    );
  },

  render3D: (element, layer, scene) => {
    let w = element.properties.getIn(['width', 'length']);
    let h = element.properties.getIn(['height', 'length']);
    let d = element.properties.getIn(['depth', 'length']);
    let geometry = new BoxGeometry(w, h, d);
    let material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    let mesh = new Mesh(geometry, material);

    let box = new BoxHelper(mesh, !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED );
    box.material.linewidth = 2;
    box.renderOrder = 1000;
    mesh.add(box);

    mesh.position.y = (h / 2);

    return Promise.resolve(mesh);
  }
});
