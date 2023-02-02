<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import type { GroupProps } from "svelte-cubed/components/objects/Group.svelte";
  import * as THREE from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  const heightMap = new THREE.TextureLoader().load(
    "/textures/heightmap-300x300.png"
  );

  let appState: AppState;

  $: terrainSize = appState.controls.terrain.size;
  $: terrainSegments = appState.controls.terrain.segments;
  $: terrainDisplacementScale = appState.controls.terrain.displacementScale;

  let terrainPosition: GroupProps["position"] = [4, 0, 4];
  $: terrainPosition = [terrainSize / 2 - 1, 0, terrainSize / 2 - 1];

  const color = new THREE.Color("burlywood"); // "burlywood"
  const dispacementColor = new THREE.Color("tan");
  const wireframeColor = new THREE.Color("ghostwhite"); // "sandybrown"
  const wireframeMainAxisColor = new THREE.Color("ghostwhite");

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);
</script>

<SC.Group position={terrainPosition}>
  <!-- TERRAIN GRID -->
  <SC.Primitive
    object={new THREE.GridHelper(
      terrainSize,
      terrainSize,
      wireframeMainAxisColor,
      wireframeColor
    )}
    position={[0, 0.004, 0]}
  />

  <!-- FLAT TERRAIN -->
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      terrainSize,
      terrainSize,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshBasicMaterial({
      color,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, 0.001, 0]}
    receiveShadow
  />

  <!-- TERRAIN ELEVATION -->
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      terrainSize,
      terrainSize,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshPhongMaterial({
      color: dispacementColor,
      side: THREE.DoubleSide,
      displacementMap: heightMap,
      displacementScale: terrainDisplacementScale,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
    receiveShadow
  />

  <!-- TERRAIN ELEVATION GRID -->
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      terrainSize,
      terrainSize,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshPhongMaterial({
      color: wireframeColor,
      side: THREE.FrontSide,
      displacementMap: heightMap,
      displacementScale: terrainDisplacementScale,
      wireframe: true,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
    receiveShadow
  />
</SC.Group>
