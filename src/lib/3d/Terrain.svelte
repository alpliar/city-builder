<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import { BackSide, Color, FrontSide } from "three";

  const heightMap = new THREE.TextureLoader().load(
    "/textures/heightmap-300x300.png"
  );

  const terrainSegments = 20;
  const terrainDisplacementScale = 20;
</script>

<SC.Group position={[0, 0, 0]}>
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      100,
      100,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshBasicMaterial({
      color: new THREE.Color("burlywood"),
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, 0, 0]}
    receiveShadow
  />
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      100,
      100,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshPhongMaterial({
      color: new THREE.Color("burlywood"),
      side: THREE.DoubleSide,
      displacementMap: heightMap,
      displacementScale: terrainDisplacementScale,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
    receiveShadow
  />
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(
      100,
      100,
      terrainSegments,
      terrainSegments
    )}
    material={new THREE.MeshPhongMaterial({
      color: new THREE.Color("gainsboro"),
      side: THREE.FrontSide,
      displacementMap: heightMap,
      displacementScale: terrainDisplacementScale,

      wireframe: true,
    })}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, (-1 * terrainDisplacementScale) / 2, 0]}
    receiveShadow
  />

  <SC.Primitive
    object={new THREE.GridHelper(
      100,
      100,
      new THREE.Color("ghostwhite"),
      new THREE.Color("gainsboro")
    )}
    position={[0, 0.001, 0]}
  />
</SC.Group>
