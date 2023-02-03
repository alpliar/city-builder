import { writable } from "svelte/store";
import * as THREE from "three";
import type { AppState } from "./models/AppState.model";
import type { Construction, Grid, GridTile } from "./models/Grid.model";

const smallBuilding: Construction = {
  color: new THREE.Color("springgreen"),
  height: 0.5,
  width: 0.5,
  name: "small building",
};
const mediumBuilding: Construction = {
  color: new THREE.Color("tomato"),
  height: 1.5,
  width: 0.75,
  name: "medium building",
};
const hugeBuilding: Construction = {
  color: new THREE.Color("rebeccapurple"),
  height: 3,
  width: 0.9,
  name: "Sky scrapper",
};
const emptyTile = { construction: null };
const tileWithConstruction = (construction): GridTile => {
  return {
    construction,
  };
};

const terrainSize = 10;

// const grid: Grid = Array(terrainSize).fill(Array(terrainSize).fill(emptyTile));

const grid: Grid = [
  [
    emptyTile,
    emptyTile,
    tileWithConstruction(smallBuilding),
    emptyTile,
    tileWithConstruction(mediumBuilding),
    emptyTile,
  ],
  [
    tileWithConstruction(smallBuilding),
    emptyTile,
    emptyTile,
    emptyTile,
    tileWithConstruction(mediumBuilding),
    emptyTile,
  ],
  [
    tileWithConstruction(smallBuilding),
    emptyTile,
    tileWithConstruction(mediumBuilding),
    emptyTile,
    emptyTile,
    emptyTile,
  ],
  [
    tileWithConstruction(smallBuilding),
    emptyTile,
    emptyTile,
    emptyTile,
    emptyTile,
    tileWithConstruction(mediumBuilding),
  ],
  [
    emptyTile,
    emptyTile,
    emptyTile,
    tileWithConstruction(mediumBuilding),
    emptyTile,
    emptyTile,
  ],
  [
    emptyTile,
    emptyTile,
    emptyTile,
    emptyTile,
    emptyTile,
    tileWithConstruction(hugeBuilding),
  ],
];

export const appStore = writable<AppState>({
  autoRotate: false,
  grid,
  gameIsPaused: false,
  gameHasStarted: false,
  dayNightCycle: false,
  controls: {
    terrain: {
      size: terrainSize,
      displacementScale: 3,
      segments: 30,
    },
    depth: 1,
    height: 1,
    width: 1,
    ambientLight: {
      intensity: 0.5,
    },
    directionalLight: {
      intensity: 1,
      position: [5, 3, 2],
    },
    fogDensity: 0.01,
  },
  constants: {
    positions: {
      floor: 0.001,
      tile: 0.001,
      objectsFloor: 0.002,
    },
  },
});
