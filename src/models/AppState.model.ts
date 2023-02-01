interface AppControls {
  width: number;
  height: number;
  depth: number;
  lightIntensity: number;
  fogDensity: number;
}
export interface AppState {
  controls: AppControls;
}
