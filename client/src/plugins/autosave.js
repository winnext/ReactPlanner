const localStorage = window.hasOwnProperty("localStorage")
  ? window.localStorage
  : false;
import { loadProject } from "../actions/project-actions";
import axios from "axios";

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave(autosaveKey, delay) {
  return (store, stateExtractor) => {
    delay = delay || TIMEOUT_DELAY;
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    if (key) {
      axios
      .get("http://localhost:9001/plan/" + key)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          store.dispatch(loadProject(res.data.plan));
        } else {
          let state = stateExtractor(store.getState());
          let plan = state.scene.toJS()
          plan.layers["layer-1"].key = key
          axios
          .post("http://localhost:9001/plan", {
            key,
            plan: plan,
              })
              .then((res) => {
                console.log(res);
                store.dispatch(loadProject(plan));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
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
    //     axios.patch("http://localhost:9001/plan/" + key, { key, plan });

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
      let data = localStorage.getItem(autosaveKey);
      let json = JSON.parse(data);
      store.dispatch(loadProject(json));
    }

    //update
    store.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let state = stateExtractor(store.getState());
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
