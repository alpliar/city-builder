<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import type { AppState } from "../models/AppState.model";
  import { appStore } from "../stores";
  import Building from "./Building.svelte";
  import Controls from "./Controls.svelte";
  import Plane from "./Plane.svelte";

  let state: AppState;

  const unsubscribe = appStore.subscribe((value) => (state = value));
  onDestroy(unsubscribe);

  const smallBuilding = { color: 0x3eff00, height: 1 };
  const mediumBuilding = { color: 0xff3e00, height: 2 };
  const hugeBuilding = { color: 0x000000, height: 4 };

  const grid = [
    [null, mediumBuilding, smallBuilding, smallBuilding],
    [hugeBuilding, smallBuilding, mediumBuilding],
    [mediumBuilding, null, smallBuilding, null],
  ];
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("papayawhip")}
  fog={new THREE.FogExp2("papayawhip", state.controls.fogDensity)}
  shadows
>
  {#each grid as row, iRow}
    {#each row as construction, iTile}
      {#if construction}
        <Building
          scale={[
            state.controls.width,
            construction.height || state.controls.height,
            state.controls.depth,
          ]}
          position={[iTile, 0, iRow]}
          color={construction.color}
        />
      {/if}
    {/each}
  {/each}

  <SC.PerspectiveCamera position={[1, 1, 3]} />

  <SC.OrbitControls enableZoom enablePan maxPolarAngle={Math.PI * 0.51} />
  <SC.AmbientLight intensity={state.controls.lightIntensity} />

  <SC.DirectionalLight
    intensity={0.6}
    position={[-2, 3, 2]}
    shadow={{ mapSize: [2048, 2048] }}
  />

  <Plane height={state.controls.height} />
</SC.Canvas>

<Controls />
