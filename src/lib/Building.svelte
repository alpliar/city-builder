<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as THREE from "three";

  export let scale: number | [number, number, number];
</script>

<SC.Mesh
  geometry={new THREE.BoxGeometry()}
  material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
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
