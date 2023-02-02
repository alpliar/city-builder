<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  import Controls from "../interface/Controls.svelte";
  import Building from "./Building.svelte";
  import Plane from "./Plane.svelte";
  import Tile from "./surfaces/Tile.svelte";
  import Tree from "./Tree.svelte";

  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("papayawhip")}
  fog={new THREE.FogExp2("papayawhip", appState.controls.fogDensity)}
  shadows
>
  {#each appState.grid as row, iRow}
    {#each row as tile, iTile}
      <Tile
        isEmpty={!tile?.construction}
        position={[iTile - 0.5, 0.002, iRow - 0.5]}
      />
      {#if tile?.construction}
        <Building
          scale={[
            appState.controls.width,
            tile.construction.height || appState.controls.height,
            appState.controls.depth,
          ]}
          position={[iTile, tile.construction.height / 2, iRow]}
          color={tile.construction.color}
        />
      {:else}
        <Tree
          scale={[
            appState.controls.width,
            appState.controls.height,
            appState.controls.depth,
          ]}
          position={[iTile, 0 + 1 / 2, iRow]}
        />
      {/if}
    {/each}
  {/each}

  <SC.PerspectiveCamera position={[-3, 3, 5]} />

  <SC.OrbitControls enableZoom enablePan maxPolarAngle={Math.PI * 0.51} />
  <SC.AmbientLight intensity={appState.controls.lightIntensity} />

  <SC.DirectionalLight
    intensity={0.6}
    position={[-2, 3, 2]}
    shadow={{ mapSize: [2048, 2048] }}
  />

  <Plane />
</SC.Canvas>

<Controls />
