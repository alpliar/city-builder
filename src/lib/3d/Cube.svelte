<script lang="ts">
  import { T } from "@threlte/core";
  import { onDestroy } from "svelte";
  import { BoxGeometry } from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  const boxColors = [
    "#3c42c4",
    "#6e51c8",
    "#a065cd",
    "#ce79d2",
    "#d68fb8",
    "#dda2a3",
    "#eac4ae",
    "#f4dfbe",
  ];

  let appState: AppState;
  export let position;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);
</script>

<T.Group {position}>
  <T.Mesh
    castShadow={appState.graphics.shadows}
    receiveShadows={appState.graphics.shadows}
  >
    <T.BoxGeometry />
    <T.MeshPhysicalMaterial
      args={[
        {
          color: boxColors[Math.floor(Math.random() * boxColors.length)],
          flatShading: true,
        },
      ]}
    />
  </T.Mesh>

  <T.LineSegments>
    <T.EdgesGeometry args={[new BoxGeometry()]} />

    <T.MeshBasicMaterial
      args={[
        {
          color: 0x333333,
        },
      ]}
    />
  </T.LineSegments>
</T.Group>
