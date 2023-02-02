<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  import Controls from "../interface/Controls.svelte";
  import Building from "./Building.svelte";
  import Terrain from "./Terrain.svelte";
  import Tile from "./surfaces/Tile.svelte";
  import Tree from "./Tree.svelte";
  import type { PerspectiveCameraProps } from "svelte-cubed/components/cameras/PerspectiveCamera.svelte";
  import type { DirectionalLightProps } from "svelte-cubed/components/lights/DirectionalLight.svelte";

  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
        console.log("up");
        break;
      case 40:
        console.log("down");
        break;
      case 37:
        console.log("left");
        break;
      case 39:
        console.log("right");
        break;
    }
  }

  let cameraPosition: PerspectiveCameraProps["position"] = [-3, 3, 5];
  const lightPosition: DirectionalLightProps["position"] = [-2, 3, 2];
  let lightIntensity: DirectionalLightProps["intensity"] = 0.6;
  $: lightIntensity = 0.6;
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

  <SC.PerspectiveCamera position={cameraPosition} />

  <SC.OrbitControls
    enableDamping
    enableZoom
    enablePan
    autoRotate={appState.autoRotate}
    maxPolarAngle={Math.PI * 0.48}
  />
  <SC.AmbientLight intensity={appState.controls.lightIntensity} />

  <SC.DirectionalLight
    intensity={lightIntensity}
    position={lightPosition}
    shadow={{ mapSize: [2048, 2048] }}
  />

  <Terrain />
</SC.Canvas>

<Controls />

<svelte:window on:keydown|preventDefault={onKeyDown} />
