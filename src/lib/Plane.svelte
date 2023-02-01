<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  export let height: number;
</script>

<SC.Group position={[0, -height / 2, 0]}>
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(50, 50)}
    material={new THREE.MeshStandardMaterial({ color: "burlywood" })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, 0.001, 0]}
    receiveShadow
  />

  <SC.Primitive
    object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
    position={[0, 0.001, 0]}
  />
</SC.Group>
