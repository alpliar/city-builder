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
  export let isRightTurn: boolean = false;
  export let isLeftTurn: boolean = false;
  export let withCrossing: boolean = false;
  let url: string;

  enum Road {
    Straight = "/models/Road_1.glb",
    Turn = "/models/Road_turn.glb",
    Crossing = "/models/Road_crossing.glb",
  }

  const getUrl = () => {
    if (withCrossing) return Road.Crossing;
    if (isRightTurn || isLeftTurn) return Road.Turn;
    return Road.Straight;
  };
</script>

<GLTF
  useDraco
  url={getUrl()}
  {position}
  rotation={new Vector3(0, MathUtils.DEG2RAD * rotation, 0)}
  receiveShadow={appState.graphics.shadows}
  castShadow={appState.graphics.shadows}
  interactive
  scale={0.5}
  on:click={() => {
    console.log("Road was clicked!", getUrl());
  }}
/>
