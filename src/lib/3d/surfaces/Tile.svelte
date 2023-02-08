<script lang="ts">
  import * as Threlte from "@threlte/core";
  import { onDestroy } from "svelte";
  import * as Three from "three";
  import { MathUtils, Vector3 } from "three";
  import type { AppState } from "../../../models/AppState.model";
  import { appStore } from "../../../stores";

  export let isEmpty: boolean = true;
  export let position: Threlte.Position;

  let appState: AppState;
  const unsubscribe = appStore.subscribe((state) => (appState = state));

  onDestroy(unsubscribe);
  const color: Three.ColorRepresentation = new Three.Color(
    isEmpty ? "forestgreen" : "#222"
  );
</script>

<Threlte.Mesh
  geometry={new Three.BoxGeometry(1, 1, appState.constants.positions.floor)}
  material={new Three.MeshPhysicalMaterial({
    color,
    clearcoat: 1,
    clearcoatRoughness: 1,
  })}
  rotation={new Three.Vector3(MathUtils.DEG2RAD * 90, 0, 0)}
  {position}
/>
