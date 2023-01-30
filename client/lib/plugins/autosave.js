"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autosave;

var _projectActions = require("../actions/project-actions");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStorage = window.hasOwnProperty("localStorage") ? window.localStorage : false;


var TIMEOUT_DELAY = 1000;

var timeout = null;

function autosave(autosaveKey, delay) {
  return function (store, stateExtractor) {
    delay = delay || TIMEOUT_DELAY;
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    if (key) {
      _axios2.default.get("http://localhost:9001/plan/" + key).then(function (res) {
        if (res.data) {
          console.log(res.data);
          store.dispatch((0, _projectActions.loadProject)(res.data.plan));
        } else {
          window.location.href = "http://localhost:3000/facilitystructure";
        }
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      window.location.href = "http://localhost:3000/facilitystructure";
      // window.location.href = "http://localhost:3000/facilitystructure?search="+key;
    }

    // auto save in database
    // store.subscribe(() => {
    //   if (timeout) clearTimeout(timeout);
    //   const state = stateExtractor(store.getState());
    //   const plan = state.get("scene").toJS();
    //   timeout = setTimeout(() => {
    //     // axios.patch("http://localhost:9001/plan/" + key, { key, plan });

    //     /*let scene = state.sceneHistory.last;
    //     if (scene) {
    //       let json = JSON.stringify(scene.toJS());
    //       localStorage.setItem(autosaveKey, json);
    //     }*/
    //   }, delay);
    // });

    return;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      var data = localStorage.getItem(autosaveKey);
      var json = JSON.parse(data);
      store.dispatch((0, _projectActions.loadProject)(json));
    }

    //update
    store.subscribe(function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function () {
        var state = stateExtractor(store.getState());
        localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}