<script lang="ts">
  import type { Position } from "@threlte/core";
  import { GLTF } from "@threlte/extras";
  import { onDestroy } from "svelte";
  import * as Three from "three";
  import { getRandomItemFromArray } from "../../helpers/random.helper";

  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  export let position: Position;

  const buildings: string[] = [
    "/models/House_1.glb",
    "/models/House_2.glb",
    "/models/House_3.glb",
    "/models/House_4.glb",
  ];
  const rotationAngle: number[] = [0, 90, 180];
  const rotation = new Three.Vector3(
    0,
    Three.MathUtils.DEG2RAD * getRandomItemFromArray(rotationAngle),
    0
  );
</script>

<GLTF
  url={getRandomItemFromArray(buildings)}
  {position}
  {rotation}
  receiveShadow={appState.graphics.shadows}
  castShadow={appState.graphics.shadows}
  interactive
  scale={1 / 10}
  on:click={() => {
    console.log("Building was clicked!");
  }}
/>
