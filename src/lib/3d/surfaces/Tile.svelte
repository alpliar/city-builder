<script lang="ts">
  import { T, Three } from "@threlte/core";
  import { onDestroy } from "svelte";
  import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
  import type { AppState } from "../../../models/AppState.model";
  import { appStore } from "../../../stores";

  export let isEmpty: boolean = true;
  export let position;

  let appState: AppState;
  const unsubscribe = appStore.subscribe((state) => (appState = state));

  onDestroy(unsubscribe);
  const color = isEmpty ? "goldenrod" : "peru";
</script>

<Three
  type={Mesh}
  geometry={new BoxGeometry(1, 1, appState.constants.positions.floor)}
  material={new MeshStandardMaterial({
    color,
    flatShading: true,
    opacity: 0.5,
    transparent: true,
  })}
  rotation={[-Math.PI / 2, 0, 0]}
  {position}
/>
