import React from "react";
import * as THREE from "three";
import { BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper } from "three";
import { ReactPlannerSharedStyle } from "react-planner";
import { loadObjWithMaterial } from "./utils/load-obj";

var cached3D = null;

export default (function (props) {
  return {
    name: props.name,
    prototype: "items",

    info: {
      title: props.name,
      tag: [props.name],
      description: props.name,
      image: props.image,
      key: props.key
    },

    properties: {
      color: {
        label: "Color",
        type: "color",
        defaultValue: ReactPlannerSharedStyle.AREA_MESH_COLOR.unselected
      },
      width: {
        label: "Width",
        type: "length-measure",
        defaultValue: {
          length: parseInt(props.width),
          unit: "cm"
        }
      },
      height: {
        label: "Height",
        type: "length-measure",
        defaultValue: {
          length: 100,
          unit: "cm"
        }
      },
      depth: {
        label: "Depth",
        type: "length-measure",
        defaultValue: {
          length: parseInt(props.height),
          unit: "cm"
        }
      }
    },

    render2D: function render2D(element, layer, scene) {
      var style = {
        stroke: !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED,
        strokeWidth: 2,
        fill: element.properties.get("color")
      };

      var w = element.properties.getIn(["width", "length"]);
      var d = element.properties.getIn(["depth", "length"]);
      var w2 = w / 2;
      var d2 = d / 2;

      var angle = element.rotation + 90;
      var textRotation = 0;
      if (Math.sin(angle * Math.PI / 180) < 0) {
        textRotation = 180;
      }
      var image = undefined;
      if (element.info.images) {
        var images = element.info.images === "" ? [] : JSON.parse(element.info.images);
        image = images.find(function (i) {
          return i.main === true;
        }) || images[0];
      }
      image = image || props.image;
      return React.createElement(
        "g",
        { transform: "translate(-" + w2 + ", -" + d2 + ")" },
        React.createElement("rect", { x: "0", y: "0", width: w, height: d, style: style }),
        image ? React.createElement("image", {
          key: "2",
          x: "0",
          y: "0",
          width: w,
          height: d,
          preserveAspectRatio: "none",
          transform: "translate(0, " + d + ") scale(1,-1) rotate(" + textRotation + ")",
          href: props.image
        }) : null,
        React.createElement(
          "text",
          {
            key: "3",
            x: "0",
            y: "0",
            transform: "translate(" + w / 2 + ", " + d / 2 + ") scale(1,-1) rotate(" + textRotation + ")",
            style: { textAnchor: "middle", fontSize: "11px", opacity: 0.3 }
          },
          element.type
        )
      );
    },

    render3D: function render3D(element, layer, scene) {
      var onLoadItem = function onLoadItem(object) {
        var WIDTH = element.properties.get("width").get("length");
        var HEIGHT = element.properties.get("height").get("length");
        var DEPTH = element.properties.get("depth").get("length");
        var MaxLOD = new THREE.Object3D();
        MaxLOD.add(object.clone());

        var value = new THREE.Box3().setFromObject(MaxLOD);

        var deltaX = Math.abs(value.max.x - value.min.x);
        var deltaY = Math.abs(value.max.y - value.min.y);
        var deltaZ = Math.abs(value.max.z - value.min.z);

        MaxLOD.position.x += WIDTH;
        // MaxLOD.position.y += (HEIGHT*deltaY) / 2;
        // MaxLOD.position.y += HEIGHT / 2;
        MaxLOD.position.z += DEPTH;

        // MaxLOD.scale.set(
        //   WIDTH * deltaX, 
        //   HEIGHT * deltaY, 
        //   DEPTH * deltaZ
        //   );
        MaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);
        var lod = new THREE.LOD();

        lod.addLevel(MaxLOD, 200);

        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        if (element.selected) {
          var bbox = new THREE.BoxHelper(lod, 0x99c3fb);
          bbox.material.linewidth = 5;
          bbox.renderOrder = 1000;
          bbox.material.depthTest = false;
          lod.add(bbox);
        }

        return lod;
      };

      if (cached3D) {
        return Promise.resolve(onLoadItem(cached3D));
      }

      // let mtl = require("./butterfly.mtl");
      // let obj = require("./butterfly.obj");
      // let img = require("./butterflywings.png");

      console.log(props.modelMtl);
      console.log(props.modelObj);

      return loadObjWithMaterial(props.modelMtl, props.modelObj).then(function (object) {
        cached3D = object;
        return onLoadItem(cached3D);
      });
    }
  };
});