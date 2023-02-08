<script lang="ts">
  import * as Three from "three";
  import * as Threlte from "@threlte/core";
  import { onDestroy } from "svelte";

  export let color: Three.ColorRepresentation;
  let renderCamera: Three.Camera;

  const { scene, renderer, camera } = Threlte.useThrelte();

  const unsubscribe = camera.subscribe((camera) => (renderCamera = camera));
  onDestroy(unsubscribe);

  $: if (color) {
    scene.background = new Three.Color(color);
    renderer.render(scene, renderCamera);
  }
</script>
