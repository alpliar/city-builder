<script lang="ts">
  import type { Position } from "@threlte/core";
  import { GLTF } from "@threlte/extras";
  import { onDestroy } from "svelte";
  import { MathUtils, Vector3 } from "three";
  import { getRandomItemFromArray } from "../../helpers/random.helper";

  import type { AppState } from "../../models/AppState.model";
  import type { RotationAngle } from "../../models/Grid.model";
  import { appStore } from "../../stores";
  let appState: AppState;
  export let rotation: RotationAngle = 0;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  export let position: Position;

  const buildings: string[] = [
    "/models/House_1.glb",
    "/models/House_2.glb",
    "/models/House_3.glb",
    "/models/House_4.glb",
  ];
</script>

<GLTF
  useDraco
  url={getRandomItemFromArray(buildings)}
  {position}
  rotation={new Vector3(0, MathUtils.DEG2RAD * rotation, 0)}
  receiveShadow={appState.graphics.shadows}
  castShadow={appState.graphics.shadows}
  interactive
  scale={1 / 5}
  on:click={() => {
    console.log("Building was clicked!");
  }}
/>
