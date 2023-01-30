import * as THREE from "three";
import React from "react";

import { loadObjWithMaterial } from "../../utils/load-obj";
import path from "path";

let cached3D = null;

const WIDTH = 90;
const DEPTH = 40;
const HEIGHT = 30;

const grey = new THREE.MeshLambertMaterial({ color: 0xd9d7d7 });
grey.side = THREE.DoubleSide;
const darkGrey = new THREE.MeshLambertMaterial({ color: 0x808287 });
darkGrey.side = THREE.DoubleSide;
const black = new THREE.MeshLambertMaterial({ color: 0x000000 });
black.side = THREE.DoubleSide;


export default {
  name: "conditioner",
  prototype: "items",

  info: {
    tag: ["furnishings", "metal"],
    title: "air conditioner",
    description: "air conditioner",
    image: require("./air_conditioner.png"),
  },
  properties: {
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 220,
        unit: "cm",
      },
    },
  },

  render2D: function (element, layer, scene) {
    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin((angle * Math.PI) / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect
          key="1"
          x="0"
          y="0"
          width={WIDTH}
          height={DEPTH}
          style={{
            stroke: element.selected ? "#0096fd" : "#000",
            strokeWidth: "2px",
            fill: "#84e1ce",
          }}
        />
        <text
          key="2"
          x="0"
          y="0"
          transform={`translate(${WIDTH / 2}, ${
            DEPTH / 2
          }) scale(1,-1) rotate(${textRotation})`}
          style={{ textAnchor: "middle", fontSize: "11px" }}
        >
          {element.type}
        </text>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let onLoadItem = (object) => {
      let newAltitude = element.properties.get("altitude").get("length");

      /*************** lod max *******************/

      let air_conditionerMaxLOD = new THREE.Object3D();
      // let loader = new THREE.JSONLoader();
      // let model = loader.parse(houseJson);
      // let mesh = new THREE.Mesh(model.geometry, model.material);
      // air_conditionerMaxLOD.add(mesh);

      // var mtlLoader = new MTLLoader();
      // var materials = mtlLoader.parse(butterflyMtl);

      // let loader = new OBJLoader();
      // loader.setMaterials(materials);
      // let model = loader.parse(bugattiObj);

      // let mesh = model;
      air_conditionerMaxLOD.add(object.clone());

      // air_conditionerMaxLOD.add(objectMaxLOD.clone());

      let value = new THREE.Box3().setFromObject(air_conditionerMaxLOD);

      let deltaX = Math.abs(value.max.x - value.min.x);
      let deltaY = Math.abs(value.max.y - value.min.y);
      let deltaZ = Math.abs(value.max.z - value.min.z);

      air_conditionerMaxLOD.position.x += WIDTH / 2.2;
      air_conditionerMaxLOD.position.z += DEPTH / 1.2;
      air_conditionerMaxLOD.position.y += newAltitude;
      air_conditionerMaxLOD.rotation.y += -Math.PI / 2;
      air_conditionerMaxLOD.scale.set(
        WIDTH * 5 / deltaZ,
        HEIGHT *10 / deltaY,
        (DEPTH / deltaX / 1.4) * 5
      );
      let lod = new THREE.LOD();

      lod.addLevel(air_conditionerMaxLOD, 200);
      // lod.addLevel(air_conditionerMinLOD, 900);
      lod.updateMatrix();
      lod.matrixAutoUpdate = false;
      if (element.selected) {
        let bbox = new THREE.BoxHelper(lod, 0x99c3fb);
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

    return loadObjWithMaterial("http://localhost:9001/model/file/27279b6a-3f57-44f2-8e4c-cec5bea8f876.mtl", "http://localhost:9001/model/file/9699ac37-f6c5-4137-a82d-f162a64d7a76.obj").then(
      (object) => {
        cached3D = object;
        return onLoadItem(cached3D);
      }
    );

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + "/").then(
      (object) => {
        cached3D = object;
        return onLoadItem(cached3D);
      }
    );
  },
};
