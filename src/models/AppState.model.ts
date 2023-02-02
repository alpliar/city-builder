import type { Grid } from "./Grid.model";

interface AppControls {
  width: number;
  height: number;
  depth: number;
  lightIntensity: number;
  fogDensity: number;
}
export interface AppState {
  autoRotate: boolean;
  grid: Grid;
  gameIsPaused: boolean;
  gameHasStarted: boolean;
  controls: AppControls;
  dayNightCycle: boolean;
}
