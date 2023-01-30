"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keycloakJs = require("keycloak-js");

var _keycloakJs2 = _interopRequireDefault(_keycloakJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
var keycloak = (0, _keycloakJs2.default)({
  url: process.env.REACT_APP_API_KEYCLOAK + '/auth',
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
});

// let initOptions = {
//   url: "http://172.19.100.120:8080/auth",
//   realm: "IFM",
//   clientId: "front",
//   onLoad: "login-required",
// };

exports.default = keycloak;