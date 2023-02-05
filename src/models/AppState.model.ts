import type { SceneGraphObjectProperties } from "@threlte/core";
import type { AmbientLightProps } from "@threlte/core/dist/lights/AmbientLight.svelte";
import type { DirectionalLightProps } from "@threlte/core/dist/lights/DirectionalLight.svelte";
import type { Grid } from "./Grid.model";

interface AmbientLightControls {
  intensity: AmbientLightProps["intensity"];
  // color: AmbientLightProps['color']
}
interface DirectionalLightControls {
  intensity: DirectionalLightProps["intensity"];
  position: DirectionalLightProps["position"];
}

interface PositionsConstants {
  floor: number;
  tile: number;
  objectsFloor: number;
}
interface Constants {
  positions: PositionsConstants;
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

interface GraphicsSettings {
  antiAliasing: boolean;
  precision: "highp" | "mediump" | "lowp";
  powerPreference: "high-performance" | "low-power" | "default";
  shadows: boolean;
}

export interface AppState {
  autoRotate: boolean;
  grid: Grid;
  gameIsPaused: boolean;
  gameHasStarted: boolean;
  controls: AppControls;
  dayNightCycle: boolean;
  constants: Constants;
  graphics: GraphicsSettings;
}
