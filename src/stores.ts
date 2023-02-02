import { writable } from "svelte/store";
import * as THREE from "three";
import type { AppState } from "./models/AppState.model";
import type { Grid, GridTile } from "./models/Grid.model";

const smallBuilding = {
  color: new THREE.Color("springgreen"),
  height: 1,
  name: "small building",
};
const mediumBuilding = {
  color: new THREE.Color("tomato"),
  height: 2,
  name: "medium building",
};
const hugeBuilding = {
  color: new THREE.Color("rebeccapurple"),
  height: 4,
  name: "Sky scrapper",
};
const emptyTile = { construction: null };
const tileWithConstruction = (construction): GridTile => {
  return {
    construction,
  };
};

const grid: Grid = [
  [
    tileWithConstruction(smallBuilding),
    emptyTile,
    tileWithConstruction(mediumBuilding),
  ],
  [emptyTile, tileWithConstruction(mediumBuilding), emptyTile],
  [emptyTile, emptyTile, tileWithConstruction(hugeBuilding)],
];

export const appStore = writable<AppState>({
  autoRotate: false,
  grid,
  gameIsPaused: false,
  gameHasStarted: false,
  dayNightCycle: false,
  controls: {
    depth: 1,
    height: 1,
    width: 1,
    lightIntensity: 0.5,
    fogDensity: 0.01,
  },
});
