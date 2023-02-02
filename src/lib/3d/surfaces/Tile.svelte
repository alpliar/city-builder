<script lang="ts">
  import * as SC from "svelte-cubed";
  import type { GroupProps } from "svelte-cubed/components/objects/Group.svelte";
  import * as THREE from "three";
  export let isEmpty: boolean = true;
  export let position: GroupProps["position"];

  const color: THREE.MeshStandardMaterialParameters["color"] = isEmpty
    ? "darkseagreen"
    : "tomato";

  const map = new THREE.TextureLoader().load("/textures/brick_diffuse.jpg");
  const roughnessMap = new THREE.TextureLoader().load(
    "/textures/brick_roughness.jpg"
  );
</script>

<SC.Group {position}>
  <SC.Mesh
    geometry={new THREE.BoxGeometry(1, 1, 0.001)}
    material={new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      //   map,
      //   roughnessMap,
      //   roughness: 1,
      //   metalness: 0.5,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, 0.001, 0]}
    receiveShadow
  />

  <!-- <SC.Primitive
    object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
    position={[0, 0.001, 0]}
  /> -->
</SC.Group>
