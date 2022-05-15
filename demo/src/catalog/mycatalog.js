import { Catalog } from "react-planner";
import newItem from "./newItem";

let catalog = new Catalog();

import * as Areas from "./areas/**/planner-element.jsx";
import * as Lines from "./lines/**/planner-element.jsx";
import * as Holes from "./holes/**/planner-element.jsx";
import * as Items from "./items/**/planner-element.jsx";

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);

const items = JSON.parse(localStorage.getItem("items")) || [];
items.forEach((item) => {
  catalog.registerElement(newItem(item));
});

const dumpAssets = [
  {
      "image": "https://via.placeholder.com/100x100",
      "height": 100,
      "width": 100,
      "name": "test"
  },
  {
      "image": "https://via.placeholder.com/100x100",
      "height": 100,
      "width": 100,
      "name": "test2"
  },
  {
      "image": "https://via.placeholder.com/100x100",
      "height": 100,
      "width": 100,
      "name": "test3"
  }
]

catalog.registerCategory("assets", "Assets", []);
dumpAssets.forEach((item) => {
  const temp = newItem(item)
  catalog.registerElement(temp);
  catalog.addToCategory("assets", temp);
});

catalog.registerCategory("Add Item", "Add Item", []);
catalog.registerCategory("windows", "Windows", [
  Holes.window,
  Holes.sashWindow,
  Holes.venetianBlindWindow,
  Holes.windowCurtain,
]);
catalog.registerCategory("doors", "Doors", [
  Holes.door,
  Holes.doorDouble,
  Holes.panicDoor,
  Holes.panicDoorDouble,
  Holes.slidingDoor,
]);
export default catalog;
