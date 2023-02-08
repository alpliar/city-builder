<script lang="ts">
  import type { Position } from "@threlte/core";
  import { GLTF } from "@threlte/extras";
  import { onDestroy } from "svelte";
  import { Color, MathUtils, Vector3 } from "three";
  import { getRandomItemFromArray } from "../../helpers/random.helper";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  export let position: Position;

  const trees: string[] = [
    "/models/Fir_Tree.glb",
    "/models/Oak_Tree.glb",
    "/models/Palm_Tree.glb",
    "/models/Poplar_Tree.glb",
  ];

  const rotationAngle = MathUtils.randInt(0, 180);
  const rotation = new Vector3(0, rotationAngle, 0);
</script>

<GLTF
  useDraco
  url={getRandomItemFromArray(trees)}
  {position}
  {rotation}
  receiveShadow={appState.graphics.shadows}
  castShadow={appState.graphics.shadows}
  scale={MathUtils.randFloat(0.01, 0.15)}
  interactive
  on:click={() => {
    console.log("Tree was clicked!");
  }}
/>
