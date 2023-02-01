import { writable } from "svelte/store";
import type { ControlsState } from "./models/controls.model";

export const fogDensity = writable(0.1);

export const controlsStore = writable<ControlsState>({
  depth: 1,
  height: 1,
  width: 1,
  lightIntensity: 0.5,
  fogDensity: 0.1,
});
