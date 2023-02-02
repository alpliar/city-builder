<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as THREE from "three";

  export let scale: number | [number, number, number];
  export let position: SC.Position;
  $: x = position[0] - 0.5;
  $: y = 0.01 + position[1];
  $: z = position[2] - 0.5;

  $: adjustedPosition = [x, y, z] as SC.Position;
</script>

<SC.Mesh
  geometry={new THREE.ConeGeometry(0.1, 0.9, 8)}
  material={new THREE.MeshBasicMaterial({ color: 0x009900 })}
  position={adjustedPosition}
  {scale}
  castShadow
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
