import { writable } from "svelte/store";
import type { AppState } from "./models/AppState.model";

export const fogDensity = writable(0.1);

export const appStore = writable<AppState>({
  controls: {
    depth: 1,
    height: 1,
    width: 1,
    lightIntensity: 0.5,
    fogDensity: 0.1,
  },
});
