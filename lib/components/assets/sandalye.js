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

var WIDTH = 70;
var DEPTH = 70;
var HEIGHT = 100;

var grey = new Three.MeshBasicMaterial({ color: 0xD3D3D3 });
var metalGrey = new Three.MeshBasicMaterial({ color: 0x808080 });
var white = new Three.MeshBasicMaterial({ color: 0x000000 });
var black = new Three.MeshBasicMaterial({ color: 0x000000 });

function makeBackrest() {

  var backrest = new Three.Object3D();
  var backrestGeometry1 = new Three.CylinderGeometry(0.01, 0.01, 0.18, 32, 32);
  var backrestGeometry2 = new Three.CylinderGeometry(0.01, 0.01, 0.04, 32, 32);
  var NodeGeometry = new Three.SphereGeometry(0.01, 32, 32);
  var backrest1 = new Three.Mesh(backrestGeometry1, black);
  var backrest2 = new Three.Mesh(backrestGeometry2, black);
  var backrest3 = new Three.Mesh(backrestGeometry1, black);
  var backrest4 = new Three.Mesh(backrestGeometry2, black);
  var node1 = new Three.Mesh(NodeGeometry, black);
  var node2 = new Three.Mesh(NodeGeometry, black);
  var backrestPillow = makeBackrestPillow();
  backrest1.rotation.z = Math.PI * (90 + 6) / 180;
  backrest1.position.z = 0.05;
  backrest1.position.x = 0.09;
  backrest2.rotation.z = -Math.PI * 96 / 180;
  backrest2.position.x = 0.02 * Math.cos(Math.PI * 6 / 180);
  backrest3.rotation.z = Math.PI * (90 + 6) / 180;
  backrest3.position.z = -0.05;
  backrest3.position.x = 0.09;
  backrest4.rotation.z = -Math.PI * 96 / 180;
  backrest4.position.x = 0.02 * Math.cos(Math.PI * 6 / 180);
  node1.position.y = 0.09;
  node2.position.y = 0.09;
  node1.add(backrest2);
  node2.add(backrest4);
  backrestPillow.rotation.y = Math.PI / 2;
  backrestPillow.position.y = 0.25 + 0.02;
  backrest1.add(node1);
  backrest.add(backrest1);
  backrest3.add(node2);
  backrest.add(backrest3);
  backrest.add(backrestPillow);

  return backrest;
}

function makeBackrestMinLOD() {

  var backrest = new Three.Object3D();
  var backrestGeometry1 = new Three.CylinderGeometry(0.01, 0.01, 0.18, 8, 8);
  var backrestGeometry2 = new Three.CylinderGeometry(0.01, 0.01, 0.04, 8, 8);
  var NodeGeometry = new Three.SphereGeometry(0.01, 32, 32);
  var backrest1 = new Three.Mesh(backrestGeometry1, black);
  var backrest2 = new Three.Mesh(backrestGeometry2, black);
  var backrest3 = new Three.Mesh(backrestGeometry1, black);
  var backrest4 = new Three.Mesh(backrestGeometry2, black);
  var node1 = new Three.Mesh(NodeGeometry, black);
  var node2 = new Three.Mesh(NodeGeometry, black);
  var backrestPillow = makeBackrestPillowMinLOD();
  backrest1.rotation.z = Math.PI * (90 + 6) / 180;
  backrest1.position.z = 0.05;
  backrest1.position.x = 0.09;
  backrest2.rotation.z = -Math.PI * 96 / 180;
  backrest2.position.x = 0.02 * Math.cos(Math.PI * 6 / 180);
  backrest3.rotation.z = Math.PI * (90 + 6) / 180;
  backrest3.position.z = -0.05;
  backrest3.position.x = 0.09;
  backrest4.rotation.z = -Math.PI * 96 / 180;
  backrest4.position.x = 0.02 * Math.cos(Math.PI * 6 / 180);
  node1.position.y = 0.09;
  node2.position.y = 0.09;
  node1.add(backrest2);
  node2.add(backrest4);
  backrestPillow.rotation.y = Math.PI / 2;
  backrestPillow.position.y = 0.25 + 0.02;
  backrest1.add(node1);
  backrest.add(backrest1);
  backrest3.add(node2);
  backrest.add(backrest3);
  backrest.add(backrestPillow);

  return backrest;
}

function makeWheel() {

  var ArmrestGeometry = new Three.CylinderGeometry(0.027, 0.02, 0.3, 32, 32);
  var SupportGeometry = new Three.CylinderGeometry(0.02, 0.01, 0.02, 32, 32);
  var PivotGeometry = new Three.CylinderGeometry(0.008, 0.008, 0.01, 32, 32);
  var SupportGeometryStart = new Three.SphereGeometry(0.02, 32, 32);
  var WheelGeometry = new Three.CylinderGeometry(0.025, 0.025, 0.05, 32, 32);
  var InsideWheelGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.051, 32, 32);
  var WheelCoverGeometry = new Three.CylinderGeometry(0.026, 0.026, 0.045, 32, 32);
  var armrest = new Three.Mesh(ArmrestGeometry, metalGrey);
  var support = new Three.Mesh(SupportGeometry, metalGrey);
  var pivot = new Three.Mesh(PivotGeometry, grey);
  var SupportStart = new Three.Mesh(SupportGeometryStart, metalGrey);
  var Wheel = new Three.Mesh(WheelGeometry, black);
  var WheelCover = new Three.Mesh(WheelCoverGeometry, metalGrey);
  var InsideWheel = new Three.Mesh(InsideWheelGeometry, metalGrey);
  var Armrest1 = new Three.Object3D();
  var Armrest2 = new Three.Object3D();
  armrest.rotation.z = Math.PI * 80 / 180;
  armrest.position.x = 0.01 + 0.15;
  Armrest1.rotation.z = -Math.PI * 80 / 180;
  Armrest1.position.y = -Math.sin(Math.PI * 80 / 180) * 0.15;
  support.position.y = -0.01;
  pivot.position.y = -0.01 - 0.005;
  Wheel.rotation.x = Math.PI / 2;
  Wheel.position.y = -0.005 - 0.02;
  WheelCover.position.z = -0.003;
  Wheel.add(InsideWheel);
  Wheel.add(WheelCover);
  pivot.add(Wheel);
  support.add(pivot);
  Armrest1.add(support);
  Armrest1.add(SupportStart);
  armrest.add(Armrest1);
  Armrest2.add(armrest);
  return Armrest2;
}

function makeWheelMinLOD() {

  var ArmrestGeometry = new Three.CylinderGeometry(0.027, 0.02, 0.3, 8, 8);
  var SupportGeometry = new Three.CylinderGeometry(0.02, 0.01, 0.02, 8, 8);
  var PivotGeometry = new Three.CylinderGeometry(0.008, 0.008, 0.01, 8, 8);
  var SupportGeometryStart = new Three.SphereGeometry(0.02, 8, 8);
  var WheelGeometry = new Three.CylinderGeometry(0.025, 0.025, 0.05, 8, 8);
  var InsideWheelGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.051, 8, 8);
  var armrest = new Three.Mesh(ArmrestGeometry, metalGrey);
  var support = new Three.Mesh(SupportGeometry, metalGrey);
  var pivot = new Three.Mesh(PivotGeometry, grey);
  var SupportStart = new Three.Mesh(SupportGeometryStart, metalGrey);
  var Wheel = new Three.Mesh(WheelGeometry, black);
  var InsideWheel = new Three.Mesh(InsideWheelGeometry, metalGrey);
  var Armrest1 = new Three.Object3D();
  var Armrest2 = new Three.Object3D();
  armrest.rotation.z = Math.PI * 80 / 180;
  armrest.position.x = 0.01 + 0.15;
  Armrest1.rotation.z = -Math.PI * 80 / 180;
  Armrest1.position.y = -Math.sin(Math.PI * 80 / 180) * 0.15;
  support.position.y = -0.01;
  pivot.position.y = -0.01 - 0.005;
  Wheel.rotation.x = Math.PI / 2;
  Wheel.position.y = -0.005 - 0.02;
  Wheel.add(InsideWheel);
  pivot.add(Wheel);
  support.add(pivot);
  Armrest1.add(support);
  Armrest1.add(SupportStart);
  armrest.add(Armrest1);
  Armrest2.add(armrest);
  return Armrest2;
}

function makeBackrestPillow() {

  var pillow = new Three.Object3D();
  var CenterGeometry = new Three.BoxGeometry(0.3, 0.5, 0.04);
  var ShortEdgeGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.3, 32, 32);
  var LongEdgeGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.5, 32, 32);
  var AngleGeometry = new Three.SphereGeometry(0.02, 32, 32);
  var edgeShort1 = new Three.Mesh(ShortEdgeGeometry, white);
  var edgeShort2 = new Three.Mesh(ShortEdgeGeometry, white);
  var edgeLong1 = new Three.Mesh(LongEdgeGeometry, white);
  var edgeLong2 = new Three.Mesh(LongEdgeGeometry, white);
  var angle1c = new Three.Mesh(AngleGeometry, white);
  var angle2c = new Three.Mesh(AngleGeometry, white);
  var angle1l = new Three.Mesh(AngleGeometry, white);
  var angle2l = new Three.Mesh(AngleGeometry, white);
  var center = new Three.Mesh(CenterGeometry, white);
  edgeShort1.rotation.z = Math.PI / 2;
  edgeShort1.position.y = 0.25;
  angle1c.position.y = 0.15;
  edgeShort2.rotation.z = Math.PI / 2;
  edgeShort2.position.y = -0.25;
  angle2c.position.y = -0.15;
  edgeLong1.position.x = 0.15;
  angle1l.position.y = 0.25;
  edgeLong2.position.x = -0.15;
  angle2l.position.y = -0.25;
  edgeLong2.add(angle2l);
  pillow.add(edgeLong2);
  edgeLong1.add(angle1l);
  pillow.add(edgeLong1);
  edgeShort2.add(angle2c);
  pillow.add(edgeShort2);
  edgeShort1.add(angle1c);
  pillow.add(edgeShort1);
  pillow.add(center);
  return pillow;
}

function makeBackrestPillowMinLOD() {

  var pillow = new Three.Object3D();
  var CenterGeometry = new Three.BoxGeometry(0.3, 0.5, 0.04);
  var ShortEdgeGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.3, 8, 8);
  var LongEdgeGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.5, 8, 8);
  var AngleGeometry = new Three.SphereGeometry(0.02, 32, 32);
  var edgeShort1 = new Three.Mesh(ShortEdgeGeometry, white);
  var edgeShort2 = new Three.Mesh(ShortEdgeGeometry, white);
  var edgeLong1 = new Three.Mesh(LongEdgeGeometry, white);
  var edgeLong2 = new Three.Mesh(LongEdgeGeometry, white);
  var angle1c = new Three.Mesh(AngleGeometry, white);
  var angle2c = new Three.Mesh(AngleGeometry, white);
  var angle1l = new Three.Mesh(AngleGeometry, white);
  var angle2l = new Three.Mesh(AngleGeometry, white);
  var center = new Three.Mesh(CenterGeometry, white);
  edgeShort1.rotation.z = Math.PI / 2;
  edgeShort1.position.y = 0.25;
  angle1c.position.y = 0.15;
  edgeShort2.rotation.z = Math.PI / 2;
  edgeShort2.position.y = -0.25;
  angle2c.position.y = -0.15;
  edgeLong1.position.x = 0.15;
  angle1l.position.y = 0.25;
  edgeLong2.position.x = -0.15;
  angle2l.position.y = -0.25;
  edgeLong2.add(angle2l);
  pillow.add(edgeLong2);
  edgeLong1.add(angle1l);
  pillow.add(edgeLong1);
  edgeShort2.add(angle2c);
  pillow.add(edgeShort2);
  edgeShort1.add(angle1c);
  pillow.add(edgeShort1);
  pillow.add(center);
  return pillow;
}

function makeBody() {

  var body = new Three.Object3D();
  var SupportPillowGeometry1 = new Three.BoxGeometry(0.28, 0.06, 0.07);
  var SupportPillowGeometry2 = new Three.BoxGeometry(0.3, 0.04, 0.09);
  var ShortHandleGeometry = new Three.CylinderGeometry(0.0045, 0.0045, 0.07, 32, 32);
  var LongHandleGeometry = new Three.CylinderGeometry(0.0045, 0.0045, 0.09, 32, 32);
  var HandleGeometry = new Three.CylinderGeometry(0.007, 0.005, 0.06, 32);
  var ArmrestSupportGeometry = new Three.CylinderGeometry(0.01, 0.01, 0.2, 32, 32);
  var SupportPillow1 = new Three.Mesh(SupportPillowGeometry1, metalGrey);
  var SupportPillow2 = new Three.Mesh(SupportPillowGeometry2, metalGrey);
  var LongHandle = new Three.Mesh(LongHandleGeometry, white);
  var ShortHandle = new Three.Mesh(ShortHandleGeometry, white);
  var Handle1 = new Three.Mesh(HandleGeometry, black);
  var Handle2 = new Three.Mesh(HandleGeometry, black);
  var ArmrestBase1 = new Three.Mesh(ArmrestSupportGeometry, metalGrey);
  var ArmrestBase2 = new Three.Mesh(ArmrestSupportGeometry, metalGrey);
  var Pillow = makePillow();
  var armrest1 = makeArmrest();
  var armrest2 = makeArmrest();
  SupportPillow1.position.y = 0.03;
  SupportPillow2.rotation.z = Math.PI * 6 / 180;
  SupportPillow2.position.y = 0.06;
  LongHandle.rotation.x = Math.PI * 80 / 180;
  LongHandle.position.z = 0.035 + 0.045;
  LongHandle.position.x = 0.1;
  ShortHandle.rotation.x = -Math.PI * 80 / 180;
  ShortHandle.position.z = -0.035 - 0.035;
  ShortHandle.position.x = 0.08;
  Handle2.position.y = 0.035 + 0.03;
  Handle1.position.y = 0.045 + 0.03;
  Pillow.position.y = 0.02 + 0.02;
  ArmrestBase1.rotation.x = Math.PI / 2;
  ArmrestBase1.rotation.y = -Math.PI * 6 / 180;
  ArmrestBase2.rotation.x = Math.PI / 2;
  ArmrestBase2.rotation.y = -Math.PI * 6 / 180;
  ArmrestBase1.position.z = 0.045 + 0.1;
  ArmrestBase2.position.z = -0.045 - 0.1;
  armrest1.position.y = 0.1;
  armrest2.position.y = -0.1;
  SupportPillow2.add(Pillow);
  ArmrestBase1.add(armrest1);
  ArmrestBase2.add(armrest2);
  SupportPillow2.add(ArmrestBase1);
  SupportPillow2.add(ArmrestBase2);
  LongHandle.add(Handle1);
  ShortHandle.add(Handle2);
  SupportPillow1.add(LongHandle);
  SupportPillow1.add(ShortHandle);
  body.add(SupportPillow2);
  body.add(SupportPillow1);
  return body;
}

function makeBodyMinLOD() {

  var body = new Three.Object3D();
  var SupportPillowGeometry1 = new Three.BoxGeometry(0.28, 0.06, 0.07);
  var SupportPillowGeometry2 = new Three.BoxGeometry(0.3, 0.04, 0.09);
  var ArmrestSupportGeometry = new Three.CylinderGeometry(0.01, 0.01, 0.2, 8, 8);
  var SupportPillow1 = new Three.Mesh(SupportPillowGeometry1, metalGrey);
  var SupportPillow2 = new Three.Mesh(SupportPillowGeometry2, metalGrey);
  var ArmrestBase1 = new Three.Mesh(ArmrestSupportGeometry, metalGrey);
  var ArmrestBase2 = new Three.Mesh(ArmrestSupportGeometry, metalGrey);
  var Pillow = makePillow();
  var armrest1 = makeArmrestMinLOD();
  var armrest2 = makeArmrestMinLOD();
  SupportPillow1.position.y = 0.03;
  SupportPillow2.rotation.z = Math.PI * 6 / 180;
  SupportPillow2.position.y = 0.06;
  Pillow.position.y = 0.02 + 0.02;
  ArmrestBase1.rotation.x = Math.PI / 2;
  ArmrestBase1.rotation.y = -Math.PI * 6 / 180;
  ArmrestBase2.rotation.x = Math.PI / 2;
  ArmrestBase2.rotation.y = -Math.PI * 6 / 180;
  ArmrestBase1.position.z = 0.045 + 0.1;
  ArmrestBase2.position.z = -0.045 - 0.1;
  armrest1.position.y = 0.1;
  armrest2.position.y = -0.1;
  SupportPillow2.add(Pillow);
  ArmrestBase1.add(armrest1);
  ArmrestBase2.add(armrest2);
  SupportPillow2.add(ArmrestBase1);
  SupportPillow2.add(ArmrestBase2);
  body.add(SupportPillow2);
  body.add(SupportPillow1);
  return body;
}

function makeArmrest() {

  var armrest = new Three.Object3D();
  var NodeGeometry = new Three.SphereGeometry(0.01, 32, 32);
  var GeometryP1 = new Three.CylinderGeometry(0.01, 0.01, 0.24, 32, 32);
  var GeometryP2 = new Three.CylinderGeometry(0.01, 0.01, 0.04, 32, 32);
  var GeometryP3 = new Three.CylinderGeometry(0.02, 0.025, 0.2, 32, 32);
  var node1 = new Three.Mesh(NodeGeometry, metalGrey);
  var node2 = new Three.Mesh(NodeGeometry, metalGrey);
  var P1 = new Three.Mesh(GeometryP1, metalGrey);
  var P2 = new Three.Mesh(GeometryP2, metalGrey);
  var P3 = new Three.Mesh(GeometryP3, white);
  P1.rotation.x = Math.PI / 2;
  P1.rotation.z = -Math.PI * 25 / 180;
  P1.position.set(0.12 * Math.sin(P1.rotation.z), 0, -0.12 * Math.cos(P1.rotation.z));
  P2.rotation.z = Math.PI * 100 / 180;
  P2.position.x = 0.02;
  P2.position.y = 0.0035;
  node2.position.y = -0.12;
  P3.position.y = -0.1 - 0.02;
  P2.add(P3);
  node2.add(P2);
  P1.add(node2);
  node1.add(P1);
  armrest.add(node1);
  return armrest;
}

function makeArmrestMinLOD() {

  var armrest = new Three.Object3D();
  var NodeGeometry = new Three.SphereGeometry(0.01, 8, 8);
  var GeometryP1 = new Three.CylinderGeometry(0.01, 0.01, 0.24, 8, 8);
  var GeometryP2 = new Three.CylinderGeometry(0.01, 0.01, 0.04, 8, 8);
  var GeometryP3 = new Three.CylinderGeometry(0.02, 0.025, 0.2, 8, 8);
  var node1 = new Three.Mesh(NodeGeometry, metalGrey);
  var node2 = new Three.Mesh(NodeGeometry, metalGrey);
  var P1 = new Three.Mesh(GeometryP1, metalGrey);
  var P2 = new Three.Mesh(GeometryP2, metalGrey);
  var P3 = new Three.Mesh(GeometryP3, white);
  P1.rotation.x = Math.PI / 2;
  P1.rotation.z = -Math.PI * 25 / 180;
  P1.position.set(0.12 * Math.sin(P1.rotation.z), 0, -0.12 * Math.cos(P1.rotation.z));
  P2.rotation.z = Math.PI * 100 / 180;
  P2.position.x = 0.02;
  P2.position.y = 0.0035;
  node2.position.y = -0.12;
  P3.position.y = -0.1 - 0.02;
  P2.add(P3);
  node2.add(P2);
  P1.add(node2);
  node1.add(P1);
  armrest.add(node1);
  return armrest;
}

function makePillow() {

  var pillow = new Three.Object3D();
  var CenterGeometry = new Three.BoxGeometry(0.4, 0.04, 0.4);
  var CenterPillow = new Three.Mesh(CenterGeometry, white);
  var edge1 = makeEdge();
  var edge2 = makeEdge();
  var edge3 = makeEdge();
  var edge4 = makeEdge();
  edge1.rotation.x = Math.PI / 2;
  edge1.position.x = 0.2;
  edge2.rotation.x = -Math.PI / 2;
  edge2.position.x = -0.2;
  edge3.rotation.z = -Math.PI / 2;
  edge3.position.z = -0.2;
  edge4.rotation.z = Math.PI / 2;
  edge4.position.z = 0.2;
  CenterPillow.add(edge1);
  CenterPillow.add(edge2);
  CenterPillow.add(edge3);
  CenterPillow.add(edge4);
  pillow.add(CenterPillow);
  return pillow;
}

function makeEdge() {
  var EdgeGeometry = new Three.CylinderGeometry(0.02, 0.02, 0.4, 32, 32, true);
  var AngleGeometry = new Three.SphereGeometry(0.02, 32, 32);
  var angle = new Three.Mesh(AngleGeometry, white);
  var edge = new Three.Mesh(EdgeGeometry, white);
  edge.openEnded = 1;
  angle.position.y = 0.2;
  edge.add(angle);
  return edge;
}

function makeBase() {

  var base = new Three.Object3D();
  var CylinderGeometry1 = new Three.CylinderGeometry(0.027, 0.027, 0.05, 32, 32);
  var CylinderGeometry2 = new Three.CylinderGeometry(0.03, 0.03, 0.2, 32, 32);
  var CylinderGeometry3 = new Three.CylinderGeometry(0.04, 0.04, 0.06, 32, 32);
  var CylinderCoverGeometryCylinder2 = new Three.TorusGeometry(0.04, 0.025, 32, 100);
  var CylinderGeometry4 = new Three.CylinderGeometry(0.02, 0.02, 0.14, 32, 32);
  var Cylinder1 = new Three.Mesh(CylinderGeometry1, metalGrey);
  var Cylinder2 = new Three.Mesh(CylinderGeometry2, metalGrey);
  var CoverCylinder1 = new Three.Mesh(CylinderGeometry3, metalGrey);
  var CoverCylinder2 = new Three.Mesh(CylinderCoverGeometryCylinder2, metalGrey);
  var Cylinder3 = new Three.Mesh(CylinderGeometry4, metalGrey);
  var Wheel = makeWheels();
  Cylinder1.position.y = -0.1 - 0.025;
  Cylinder3.position.y = 0.1 + 0.07;
  Wheel.position.y = -0.07;
  CoverCylinder1.position.y = -0.05;
  CoverCylinder2.rotation.x = Math.PI / 2;
  CoverCylinder2.position.y = -0.05;
  Cylinder2.add(CoverCylinder1);
  Cylinder2.add(CoverCylinder2);
  Cylinder2.add(Wheel);
  Cylinder2.add(Cylinder1);
  Cylinder2.add(Cylinder3);
  base.add(Cylinder2);
  return base;
}

function makeBaseMinLOD() {

  var base = new Three.Object3D();
  var CylinderGeometry1 = new Three.CylinderGeometry(0.027, 0.027, 0.05, 8, 8);
  var CylinderGeometry2 = new Three.CylinderGeometry(0.03, 0.03, 0.2, 8, 8);
  var CylinderGeometry3 = new Three.CylinderGeometry(0.04, 0.04, 0.06, 8, 8);
  var CylinderCoverGeometryCylinder2 = new Three.TorusGeometry(0.04, 0.025, 8, 100);
  var CylinderGeometry4 = new Three.CylinderGeometry(0.02, 0.02, 0.14, 8, 8);
  var Cylinder1 = new Three.Mesh(CylinderGeometry1, metalGrey);
  var Cylinder2 = new Three.Mesh(CylinderGeometry2, metalGrey);
  var CoverCylinder1 = new Three.Mesh(CylinderGeometry3, metalGrey);
  var CoverCylinder2 = new Three.Mesh(CylinderCoverGeometryCylinder2, metalGrey);
  var Cylinder3 = new Three.Mesh(CylinderGeometry4, metalGrey);
  var Wheel = makeWheelsMinLOD();
  Cylinder1.position.y = -0.1 - 0.025;
  Cylinder3.position.y = 0.1 + 0.07;
  Wheel.position.y = -0.07;
  CoverCylinder1.position.y = -0.05;
  CoverCylinder2.rotation.x = Math.PI / 2;
  CoverCylinder2.position.y = -0.05;
  Cylinder2.add(CoverCylinder1);
  Cylinder2.add(CoverCylinder2);
  Cylinder2.add(Wheel);
  Cylinder2.add(Cylinder1);
  Cylinder2.add(Cylinder3);
  base.add(Cylinder2);
  return base;
}

function makeWheels() {
  var wheels = new Three.Object3D();
  for (var i = 0; i < 5; i++) {
    var wheel = makeWheel();
    wheel.rotation.y = 2 * Math.PI * i * 72 / 360;
    wheels.add(wheel);
  }
  return wheels;
}

function makeWheelsMinLOD() {
  var wheels = new Three.Object3D();
  for (var i = 0; i < 5; i++) {
    var wheel = makeWheelMinLOD();
    wheel.rotation.y = 2 * Math.PI * i * 72 / 360;
    wheels.add(wheel);
  }
  return wheels;
}

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var chairDesk = new Three.Mesh();
  var baseChair = makeBase();
  var bodyChair = makeBody();
  var backrestChair = makeBackrest();
  baseChair.position.y = 0.1 + 0.07;
  bodyChair.position.y = 0.1 + 0.14;
  backrestChair.position.y = 0.06;
  backrestChair.position.x = -0.25;
  bodyChair.add(backrestChair);
  baseChair.add(bodyChair);
  chairDesk.add(baseChair);
  chairDesk.rotation.y = -0.5 * Math.PI;
  chairDesk.position.z -= 0.02;

  return chairDesk;
}

function makeObjectMinLOD() {

  var chairDesk = new Three.Mesh();
  var baseChair = makeBaseMinLOD();
  var bodyChair = makeBodyMinLOD();
  var backrestChair = makeBackrestMinLOD();
  baseChair.position.y = 0.1 + 0.07;
  bodyChair.position.y = 0.1 + 0.14;
  backrestChair.position.y = 0.06;
  backrestChair.position.x = -0.25;
  bodyChair.add(backrestChair);
  baseChair.add(bodyChair);
  chairDesk.add(baseChair);
  chairDesk.rotation.y = -0.5 * Math.PI;
  chairDesk.position.z -= 0.02;

  return chairDesk;
}

exports.default = function (props) {
  return {
    name: props.name,
    prototype: "items",

    info: {
      title: props.name,
      tag: [props.name],
      description: props.name,
      image: props.image
    },

    properties: {
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

      var angle = element.rotation + 90;

      var textRotation = 0;
      if (Math.sin(angle * Math.PI / 180) < 0) {
        textRotation = 180;
      }

      return _react2.default.createElement(
        'g',
        { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
        _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
          style: { stroke: element.selected ? '#0096fd' : 'transparent', strokeWidth: "2px", fill: "transparent" } }),
        props.image ? _react2.default.createElement('image', { key: '2', x: '0', y: '0', width: WIDTH, height: DEPTH, preserveAspectRatio: 'none', transform: 'translate(0, ' + DEPTH + ') scale(1,-1) rotate(' + textRotation + ')', href: props.image }) : null
      );
    },

    render3D: function render3D(element, layer, scene) {

      var newAltitude = element.properties.get('altitude').get('length');

      var chairDeskMaxLOD = new Three.Object3D();
      chairDeskMaxLOD.add(objectMaxLOD.clone());

      var aa = new Three.Box3().setFromObject(chairDeskMaxLOD);

      var deltaX = Math.abs(aa.max.x - aa.min.x);
      var deltaY = Math.abs(aa.max.y - aa.min.y);
      var deltaZ = Math.abs(aa.max.z - aa.min.z);

      chairDeskMaxLOD.position.y += newAltitude;
      chairDeskMaxLOD.position.x += -WIDTH / 8;
      chairDeskMaxLOD.position.z += DEPTH / 4;
      chairDeskMaxLOD.scale.set(WIDTH / deltaX, DEPTH / deltaZ, HEIGHT / deltaY);

      var chairDeskMinLOD = new Three.Object3D();
      chairDeskMinLOD.add(objectMinLOD.clone());
      chairDeskMinLOD.position.y += newAltitude;
      chairDeskMinLOD.position.x += -WIDTH / 8;
      chairDeskMinLOD.position.z += DEPTH / 4;
      chairDeskMinLOD.scale.set(WIDTH / deltaX, DEPTH / deltaZ, HEIGHT / deltaY);

      /**** all level of detail ***/

      var lod = new Three.LOD();

      lod.addLevel(chairDeskMaxLOD, 200);
      lod.addLevel(chairDeskMinLOD, 900);
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