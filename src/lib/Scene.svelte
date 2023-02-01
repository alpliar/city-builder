<script lang="ts">
  import { onDestroy } from "svelte";
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import type { ControlsState } from "../models/controls.model";
  import { controlsStore } from "../stores";
  import Building from "./Building.svelte";
  import Controls from "./Controls.svelte";
  import Plane from "./Plane.svelte";

  let state: ControlsState;

  const unsubscribe = controlsStore.subscribe((value) => (state = value));
  onDestroy(unsubscribe);
</script>

<SC.Canvas
  antialias
  background={new THREE.Color("papayawhip")}
  fog={new THREE.FogExp2("papayawhip", state.fogDensity)}
  shadows
>
  <Building scale={[state.width, state.height, state.depth]} />

  <SC.PerspectiveCamera position={[1, 1, 3]} />

  <SC.OrbitControls enableZoom enablePan maxPolarAngle={Math.PI * 0.51} />
  <SC.AmbientLight intensity={state.lightIntensity} />

  <SC.DirectionalLight
    intensity={0.6}
    position={[-2, 3, 2]}
    shadow={{ mapSize: [2048, 2048] }}
  />

  <Plane height={state.height} />
</SC.Canvas>

<Controls />
