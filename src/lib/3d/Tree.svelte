<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import type { AppState } from "../../models/AppState.model";
  import { appStore } from "../../stores";

  let appState: AppState;
  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  //export let scale: number | [number, number, number];
  export let position: SC.Position;

  const height = Math.random() + 0.2;
  const width = height > 0.5 ? Math.random() / 3.5 : Math.random() / 4;

  $: x = position[0] - 0.5;
  $: y = appState.constants.positions.objectsFloor + height / 2;
  $: z = position[2] - 0.5;

  $: adjustedPosition = [x, y, z] as SC.Position;
</script>

<SC.Mesh
  geometry={new THREE.ConeGeometry(1, 1, 16, 1, true, 2, 3 * Math.PI)}
  material={new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("seagreen"),
    flatShading: true,
  })}
  position={adjustedPosition}
  scale={[width, height, width]}
  castShadow
  receiveShadow
/>

<!-- <SC.Mesh
    geometry={new THREE.BoxGeometry()}
    material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
    scale={[width, height, depth]}
    position={[2, 0.01, 0]}
    castShadow
  />
  <SC.Mesh
    geometry={new THREE.BoxGeometry()}
    material={new THREE.MeshStandardMaterial({ color: 0x003e00 })}
    scale={[width / 2, height * 2, depth / 2]}
    position={[0, 0.01, 0]}
    castShadow
  /> -->
