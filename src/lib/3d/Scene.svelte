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
  let time = new Date();

  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("papayawhip")}
  fog={new THREE.FogExp2("papayawhip", appState.controls.fogDensity)}
  shadows
>
  <Terrain />

  {#each appState.grid as row, iRow}
    {#each row as tile, iTile}
      <Tile
        isEmpty={!tile?.construction}
        position={[iTile - 0.5, appState.constants.positions.tile, iRow - 0.5]}
      />
      {#if tile?.construction}
        <Building
          scale={[
            tile.construction.width || appState.controls.width,
            tile.construction.height || appState.controls.height,
            tile.construction.depth ||
              tile.construction.width ||
              appState.controls.depth,
          ]}
          position={[iTile, tile.construction.height / 2, iRow]}
          color={tile.construction.color}
        />
      {:else if Math.random() >= 0.7}
        <Tree
          position={[iTile, appState.constants.positions.objectsFloor, iRow]}
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
    maxDistance={50}
  />
  <SC.AmbientLight intensity={appState.controls.ambientLight.intensity} />

  <SC.DirectionalLight
    intensity={appState.controls.directionalLight.intensity}
    position={appState.controls.directionalLight.position}
    shadow={{ mapSize: [2048 * 2, 2048 * 2] }}
  />
</SC.Canvas>

<Controls />

<svelte:window on:keydown={onKeyDown} />
