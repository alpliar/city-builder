<script lang="ts">
  import { T, Three } from "@threlte/core";
  import { Grid } from "@threlte/extras";
  import { onDestroy } from "svelte";
  import {
    Color,
    FrontSide,
    Group,
    Mesh,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    PlaneGeometry,
    TextureLoader,
  } from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  const heightMap = new TextureLoader().load("/textures/heightmap-300x300.png");

  let appState: AppState;
  let terrainPosition;
  let terrainGeometry: PlaneGeometry;

  $: terrainSize = appState.controls.terrain.size;
  $: terrainSegments = appState.controls.terrain.segments;
  $: terrainDisplacementScale = appState.controls.terrain.displacementScale;

  $: terrainGeometry = new PlaneGeometry(
    terrainSize,
    terrainSize,
    terrainSegments,
    terrainSegments
  );
  $: terrainPosition = [
    terrainSize / 2 - 1,
    appState.constants.positions.floor,
    terrainSize / 2 - 1,
  ];

  const color = new Color("burlywood"); // "burlywood"
  const dispacementColor = new Color("tan");
  const wireframeColor = new Color("ghostwhite"); // "sandybrown"

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);
</script>

<Three type={Group} position={terrainPosition}>
  <!-- FLAT TERRAIN -->
  <Three
    type={Mesh}
    geometry={new PlaneGeometry(
      terrainSize,
      terrainSize,
      terrainSegments,
      terrainSegments
    )}
    material={new MeshPhysicalMaterial({
      color,
      flatShading: true,
      bumpMap: heightMap,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, appState.constants.positions.floor, 0]}
    receiveShadow
  />

  <!-- TERRAIN ELEVATION -->
  <T.Group>
    <!-- Surface -->
    <T.Mesh
      geometry={terrainGeometry}
      material={new MeshPhysicalMaterial({
        color: dispacementColor,
        side: FrontSide,
        displacementMap: heightMap,
        displacementScale: terrainDisplacementScale,
        bumpMap: heightMap,
        bumpScale: 0.5,
        flatShading: true,
        clippingPlanes: [],
      })}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
      receiveShadow
      castShadow
    />
    <!-- Grid -->
    <T.Mesh
      geometry={terrainGeometry}
      material={new MeshPhongMaterial({
        color: wireframeColor,
        side: FrontSide,
        displacementMap: heightMap,
        displacementScale: terrainDisplacementScale,
        wireframe: true,
      })}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
      receiveShadow
    />
  </T.Group>

  <!-- Grids -->
  <T.Group position.y={appState.constants.positions.objectsFloor}>
    <!-- Horizontal -->
    <Grid gridSize={[terrainSize, terrainSize]} cellSize={1} />
    <!-- Vertical -->
    <T.LineSegments>
      <T.EdgesGeometry
        args={[
          new PlaneGeometry(
            terrainSize,
            terrainSize,
            terrainSegments,
            terrainSegments
          ),
        ]}
      />

      <T.MeshBasicMaterial
        args={[
          {
            color: 0x00ff00,
          },
        ]}
      />
    </T.LineSegments>
  </T.Group>
</Three>
