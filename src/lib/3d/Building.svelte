<script lang="ts">
  import { Three } from "@threlte/core";
  import { onDestroy } from "svelte";
  import {
    BoxGeometry,
    Mesh,
    MeshPhysicalMaterial,
    type MeshStandardMaterialParameters,
  } from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  export let position;
  export let color: MeshStandardMaterialParameters["color"];

  let appState: AppState;
  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  export let height = 1;
  export let width = 1;

  const sizeRatio = 0.9;
</script>

<Three
  type={Mesh}
  geometry={new BoxGeometry(width, height, width)}
  material={new MeshPhysicalMaterial({
    color,
    clearcoat: 1,
    metalness: 1,
    roughness: 1,
    emissive: color,
    flatShading: true,
    emissiveIntensity: 0.8,
  })}
  scale={[sizeRatio, 1, sizeRatio]}
  position={[position[0], height / 2, position[2]]}
  castShadow={appState.graphics.shadows}
  receiveShadow={appState.graphics.shadows}
/>
