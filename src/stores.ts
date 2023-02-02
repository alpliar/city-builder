import { writable } from "svelte/store";
import type { AppState } from "./models/AppState.model";
import type { Grid, GridTile } from "./models/Grid.model";

const smallBuilding = { color: 0x3eff00, height: 1, name: "small building" };
const mediumBuilding = { color: 0xff3e00, height: 2, name: "medium building" };
const hugeBuilding = { color: 0x000000, height: 4, name: "Sky scrapper" };
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
  [
    tileWithConstruction(mediumBuilding),
    tileWithConstruction(mediumBuilding),
    emptyTile,
  ],
  [emptyTile, emptyTile, tileWithConstruction(hugeBuilding)],
];

export const appStore = writable<AppState>({
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
