<script lang="ts">
  import * as Threlte from "@threlte/core";
  import { Canvas, OrbitControls } from "@threlte/core";
  import { onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import * as Three from "three";
  import { Vector3 } from "three";
  import { degToRad } from "three/src/math/MathUtils";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";
  import Controls from "../interface/Controls.svelte";
  import Background from "./Background.svelte";
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
  <Background color="DarkSlateGrey" />

  <!-- <FogExp2 color={"papayawhip"} density={appState.controls.fogDensity} /> -->
  <Threlte.PerspectiveCamera
    position={{ x: 50, y: appState.controls.terrain.size * 2, z: 50 }}
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
  </Threlte.PerspectiveCamera>

  <Threlte.DirectionalLight
    color="white"
    intensity={1}
    shadow={{
      camera: {
        bottom: appState.controls.terrain.size / -2,
        left: appState.controls.terrain.size / -2,
        right: appState.controls.terrain.size / -2,
        top: appState.controls.terrain.size / -2,
        far: 1000,
        near: 1,
      },
      mapSize: [2048, 2048],
    }}
    position={{ x: 5, y: 10, z: 10 }}
  />

  <Threlte.Object3DInstance
    object={new Three.CameraHelper(
      new Three.OrthographicCamera(
        appState.controls.terrain.size / -2,
        appState.controls.terrain.size / 2,
        appState.controls.terrain.size / 2,
        appState.controls.terrain.size / -2,
        1,
        1000
      )
    )}
  />

  <Threlte.DirectionalLight
    position={{ x: -3, y: 10, z: -10 }}
    intensity={0.2}
  />
  <Threlte.AmbientLight intensity={appState.controls.ambientLight.intensity} />

  <!-- Terrain -->
  <Terrain />

  <!-- Tiles -->
  <Threlte.Group>
    {#each appState.grid as h, x}
      {#each h as v, y}
        <Threlte.Group>
          <Tile
            isEmpty={v.isEmpty}
            position={[
              x - 0.5,
              appState.constants.positions.objectsFloor,
              y - 0.5,
            ]}
          />
          {#if !v.isEmpty}
            <Building
              position={new Three.Vector3(
                x - 0.5,
                appState.constants.positions.objectsFloor,
                y - 0.5
              )}
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
        </Threlte.Group>
      {/each}
    {/each}
  </Threlte.Group>
</Canvas>
<Controls />
