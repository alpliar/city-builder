<script lang="ts">
  import { Three } from "@threlte/core";
  import { onDestroy } from "svelte";
  import { Color, ConeGeometry, Mesh, MeshPhysicalMaterial } from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  let appState: AppState;
  export let position;
  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  const height = Math.random() + 0.2;
  const width = height > 0.5 ? Math.random() / 3.5 : Math.random() / 4;
</script>

<Three
  type={Mesh}
  geometry={new ConeGeometry(1, 1, 16, 1, true, 2, 3 * Math.PI)}
  material={new MeshPhysicalMaterial({
    color: new Color("seagreen"),
    clearcoat: 1,
    metalness: 1,
    roughness: 1,
    emissive: new Color("seagreen"),
    flatShading: true,
    emissiveIntensity: 0.8,
  })}
  scale={[width, height, width]}
  position={[position[0], height / 2, position[2]]}
  castShadow={appState.graphics.shadows}
  receiveShadow={appState.graphics.shadows}
/>
