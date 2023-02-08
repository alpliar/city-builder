import { writable } from "svelte/store";
import { MathUtils, Vector3 } from "three";
import type { AppState } from "./models/AppState.model";
import { ConstructionType, type Grid } from "./models/Grid.model";
// import * as Utils from "three/src/math/MathUtils";

const emptyTile = { isEmpty: true };
const nonEmptyTile = { isEmpty: false };

const terrainSize = 6; // must be an even number
const terrainElevation = 0; //MathUtils.randFloat(0.1, 0.5);

// const grid: Grid = Array(terrainSize).fill(Array(terrainSize).fill(emptyTile));

export const defaultGrid: Grid = [
  [
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.HOUSE,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.HOUSE,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.HOUSE,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.HOUSE,
        rotation: -45,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
        rotation: 90,
      },
    },
    {
      isEmpty: true,
    },
  ],
  [
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
      },
    },
    {
      isEmpty: false,
      construction: {
        type: ConstructionType.ROAD,
        isRightTurn: true,
      },
    },
    {
      isEmpty: true,
    },
  ],
  [
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
  ],
  [
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
  ],
  [
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
  ],
  [
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
    {
      isEmpty: true,
    },
  ],
];

export const generateGrid = (size: number): Grid => {
  return [...new Array(size)].map((_row) =>
    [...new Array(size)].map((_tile) => {
      const rando = Math.random();
      if (rando > 0.9) return nonEmptyTile;
      // if (rando > 0.9) return tileWithConstruction(mediumBuilding);
      // if (rando > 0.8) return tileWithConstruction(smallBuilding);

      return emptyTile;
    })
  );
};

export const appStore = writable<AppState>({
  autoRotate: false,
  grid: defaultGrid, //generateGrid(terrainSize),
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
      intensity: 1,
    },
    directionalLight: {
      intensity: 1,
      position: new Vector3(5, 3, 2),
    },
    fogDensity: 0.01,
  },
  constants: {
    positions: {
      floor: 0,
      tile: 0.002,
      objectsFloor: 0.003,
    },
  },
});
