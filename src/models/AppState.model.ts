interface AppControls {
  width: number;
  height: number;
  depth: number;
  lightIntensity: number;
  fogDensity: number;
}
export interface AppState {
  gameIsPaused: boolean;
  gameHasStarted: boolean;
  controls: AppControls;
}
