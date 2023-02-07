import { writable } from "svelte/store";
import * as THREE from "three";
import { MathUtils, Vector3 } from "three";
import type { AppState } from "./models/AppState.model";
import type { Construction, Grid, GridTile } from "./models/Grid.model";
// import * as Utils from "three/src/math/MathUtils";

const smallBuilding: Construction = {
  color: new THREE.Color("springgreen"),
  height: 0.5,
  width: 0.5,
  name: "small building",
};
const mediumBuilding = {
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
const emptyTile = { isEmpty: true, construction: null };
const tileWithConstruction = (construction): GridTile => {
  return {
    isEmpty: false,
    construction,
  };
};

const terrainSize = 10; // must be an even number
const terrainElevation = MathUtils.randInt(1, 6);

// const grid: Grid = Array(terrainSize).fill(Array(terrainSize).fill(emptyTile));

export const generateGrid = (size: number): Grid => {
  return [...new Array(size)].map((_row) =>
    [...new Array(size)].map((_tile) => {
      const rando = Math.random();
      if (rando > 0.99) return tileWithConstruction(hugeBuilding);
      // if (rando > 0.9) return tileWithConstruction(mediumBuilding);
      // if (rando > 0.8) return tileWithConstruction(smallBuilding);

      return emptyTile;
    })
  );
};

export const appStore = writable<AppState>({
  autoRotate: false,
  grid: generateGrid(terrainSize),
  gameIsPaused: false,
  gameHasStarted: false,
  dayNightCycle: false,
  graphics: {
    antiAliasing: true,
    precision: "highp",
    powerPreference: "default",
    shadows: true,
  },
  controls: {
    terrain: {
      size: terrainSize,
      displacementScale: terrainElevation,
      segments: 30,
    },
    depth: 1,
    height: 1,
    width: 1,
    ambientLight: {
      intensity: 0.2,
    },
    directionalLight: {
      intensity: 1,
      position: new Vector3(5, 3, 2),
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
