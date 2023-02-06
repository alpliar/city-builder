<script lang="ts">
  import { Canvas, FogExp2, OrbitControls, Three } from "@threlte/core";
  import { onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import {
    AmbientLight,
    DirectionalLight,
    Group,
    PerspectiveCamera,
    Vector3,
  } from "three";
  import { degToRad } from "three/src/math/MathUtils";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  import Controls from "../interface/Controls.svelte";
  import Building from "./Building.svelte";
  import Tile from "./surfaces/Tile.svelte";
  import Terrain from "./Terrain.svelte";
  import Tree from "./Tree.svelte";

  const scale = spring(1);
  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);
</script>

<Canvas
  shadows={appState.graphics.shadows}
  flat
  linear
  rendererParameters={{
    precision: appState.graphics.precision,
    antialias: appState.graphics.antiAliasing,
    powerPreference: appState.graphics.powerPreference,
  }}
>
  <FogExp2 color={"papayawhip"} density={appState.controls.fogDensity} />
  <Three
    type={PerspectiveCamera}
    makeDefault
    position={[50, appState.controls.terrain.size * 2, 50]}
    fov={12}
  >
    <OrbitControls
      maxPolarAngle={degToRad(80)}
      enableDamping
      enableZoom
      enablePan
      target={{
        x: appState.controls.terrain.size / 2,
        z: appState.controls.terrain.size / 2,
      }}
      autoRotate={appState.autoRotate}
      maxDistance={50}
    />
  </Three>

  <Three
    type={DirectionalLight}
    castShadow={appState.graphics.shadows}
    position={[3, 10, 10]}
  />
  <Three type={DirectionalLight} position={[-3, 10, -10]} intensity={0.2} />
  <Three
    type={AmbientLight}
    intensity={appState.controls.ambientLight.intensity}
  />

  <!-- Terrain -->
  <Terrain />

  <!-- Tiles -->
  <Three type={Group}>
    {#each appState.grid as h, x}
      {#each h as v, y}
        <Three type={Group}>
          <Tile
            isEmpty={v.isEmpty}
            position={[
              x - 0.5,
              appState.constants.positions.objectsFloor,
              y - 0.5,
            ]}
          />
          {#if v.construction}
            <Building
              width={v.construction.width}
              height={v.construction.height}
              color={v.construction.color}
              position={[
                x - 0.5,
                appState.constants.positions.objectsFloor,
                y - 0.5,
              ]}
            />
          {/if}
          {#if v.isEmpty}
            {#if Math.random() > 0.4}
              <Tree
                position={new Vector3(
                  x - 0.5,
                  appState.constants.positions.objectsFloor,
                  y - 0.5
                )}
              />
            {/if}
          {/if}
        </Three>
      {/each}
    {/each}
  </Three>
</Canvas>
<Controls />
