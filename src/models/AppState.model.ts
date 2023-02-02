import type { AmbientLightProps } from "svelte-cubed/components/lights/AmbientLight.svelte";
import type { DirectionalLightProps } from "svelte-cubed/components/lights/DirectionalLight.svelte";
import type { Grid } from "./Grid.model";

interface AmbientLightControls {
  intensity: AmbientLightProps["intensity"];
  // color: AmbientLightProps['color']
}
interface DirectionalLightControls {
  intensity: DirectionalLightProps["intensity"];
  position: DirectionalLightProps["position"];
}

interface TerrainControls {
  size: number;
  segments: number;
  displacementScale: number;
}
interface AppControls {
  terrain: TerrainControls;
  width: number;
  height: number;
  depth: number;
  ambientLight: AmbientLightControls;
  directionalLight: DirectionalLightControls;
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
