'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RADIUS = 3;

var PlaneMaterial = new Three.MeshLambertMaterial({ color: 0x9b8c75 });
var material_legs = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });

function makeObjectMaxLOD(newWidth, newHeight, newDepth) {

  var table = new Three.Mesh();

  var PlaneGeometry = new Three.BoxGeometry(newWidth, newHeight / 20, newDepth);
  var plane = new Three.Mesh(PlaneGeometry, PlaneMaterial);
  plane.position.y = newHeight;
  table.add(plane);

  var geometry_legs = new Three.CylinderGeometry(RADIUS, RADIUS, newHeight, 32, 32);

  var leg1 = new Three.Mesh(geometry_legs, material_legs);
  leg1.position.x = newWidth / 2;
  leg1.position.z = newDepth / 2;
  leg1.position.y = newHeight / 2;
  table.add(leg1);

  var leg2 = new Three.Mesh(geometry_legs, material_legs);
  leg2.position.x = newWidth / 2;
  leg2.position.z = -newDepth / 2;
  leg2.position.y = newHeight / 2;
  table.add(leg2);

  var leg3 = new Three.Mesh(geometry_legs, material_legs);
  leg3.position.x = -newWidth / 2;
  leg3.position.z = newDepth / 2;
  leg3.position.y = newHeight / 2;
  table.add(leg3);

  var leg4 = new Three.Mesh(geometry_legs, material_legs);
  leg4.position.x = -newWidth / 2;
  leg4.position.z = -newDepth / 2;
  leg4.position.y = newHeight / 2;
  table.add(leg4);

  return table;
}

function makeObjectMinLOD(newWidth, newHeight, newDepth) {

  var table = new Three.Mesh();

  var PlaneGeometry = new Three.BoxGeometry(newWidth, newHeight / 20, newDepth);
  var plane = new Three.Mesh(PlaneGeometry, PlaneMaterial);
  plane.position.y = newHeight;
  table.add(plane);

  var geometry_legs = new Three.CylinderGeometry(RADIUS, RADIUS, newHeight, 8, 8);

  var leg1 = new Three.Mesh(geometry_legs, material_legs);
  leg1.position.x = newWidth / 2;
  leg1.position.z = newDepth / 2;
  leg1.position.y = newHeight / 2;
  table.add(leg1);

  var leg2 = new Three.Mesh(geometry_legs, material_legs);
  leg2.position.x = newWidth / 2;
  leg2.position.z = -newDepth / 2;
  leg2.position.y = newHeight / 2;
  table.add(leg2);

  var leg3 = new Three.Mesh(geometry_legs, material_legs);
  leg3.position.x = -newWidth / 2;
  leg3.position.z = newDepth / 2;
  leg3.position.y = newHeight / 2;
  table.add(leg3);

  var leg4 = new Three.Mesh(geometry_legs, material_legs);
  leg4.position.x = -newWidth / 2;
  leg4.position.z = -newDepth / 2;
  leg4.position.y = newHeight / 2;
  table.add(leg4);

  return table;
}

exports.default = function (props) {
  return {
    name: props.name,
    prototype: "items",

    info: {
      tag: [props.name],
      title: props.name,
      description: props.name,
      image: props.image
    },

    properties: {
      width: {
        label: "width",
        type: "length-measure",
        defaultValue: {
          length: parseInt(props.width),
          unit: 'cm'
        }
      },
      depth: {
        label: "depth",
        type: "length-measure",
        defaultValue: {
          length: parseInt(props.height),
          unit: 'cm'
        }
      },
      height: {
        label: "height",
        type: "length-measure",
        defaultValue: {
          length: 80,
          unit: 'cm'
        }
      },
      altitude: {
        label: "altitude",
        type: "length-measure",
        defaultValue: {
          length: 0,
          unit: 'cm'
        }
      }
    },

    render2D: function render2D(element, layer, scene) {

      var newWidth = element.properties.get('width').get('length');
      var newDepth = element.properties.get('depth').get('length');
      var angle = element.rotation + 90;

      var textRotation = 0;
      if (Math.sin(angle * Math.PI / 180) < 0) {
        textRotation = 180;
      }

      return _react2.default.createElement(
        'g',
        { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
        _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth,
          style: { stroke: element.selected ? '#0096fd' : 'transparent', strokeWidth: "2px", fill: "transparent" } }),
        props.image ? _react2.default.createElement('image', { key: '2', x: '0', y: '0', width: newWidth, height: newDepth, preserveAspectRatio: 'none', transform: 'translate(0, ' + newDepth + ') scale(1,-1) rotate(' + textRotation + ')', href: props.image }) : null
      );
    },

    render3D: function render3D(element, layer, scene) {

      var newWidth = element.properties.get('width').get('length');
      var newDepth = element.properties.get('depth').get('length');
      var newHeight = element.properties.get('height').get('length');
      var newAltitude = element.properties.get('altitude').get('length');

      /********** lod max ************/

      var tableMaxLOD = new Three.Object3D();
      var objectMaxLod = makeObjectMaxLOD(newWidth, newHeight, newDepth);
      tableMaxLOD.add(objectMaxLod.clone());
      tableMaxLOD.position.y += newHeight / 20 + newAltitude;

      /********** lod min ************/

      var tableMinLOD = new Three.Object3D();
      var objectMinLod = makeObjectMinLOD(newWidth, newHeight, newDepth);
      tableMinLOD.add(objectMinLod.clone());
      tableMinLOD.position.y += newHeight / 20 + newAltitude;

      /**** all level of detail ***/

      var lod = new Three.LOD();

      lod.addLevel(tableMaxLOD, 200);
      lod.addLevel(tableMinLOD, 900);
      lod.updateMatrix();
      lod.matrixAutoUpdate = false;

      if (element.selected) {
        var bbox = new Three.BoxHelper(lod, 0x99c3fb);
        bbox.material.linewidth = 5;
        bbox.renderOrder = 1000;
        bbox.material.depthTest = false;
        lod.add(bbox);
      }

      return Promise.resolve(lod);
    }

  };
};