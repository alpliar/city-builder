<script lang="ts">
  import * as Threlte from "@threlte/core";
  import { Canvas, OrbitControls } from "@threlte/core";
  import type { CanvasProps } from "@threlte/core/dist/Canvas.svelte";
  import type { OrbitControlsProps } from "@threlte/core/dist/controls/OrbitControls.svelte";
  import type { AmbientLightProps } from "@threlte/core/dist/lights/AmbientLight.svelte";
  import type { DirectionalLightProps } from "@threlte/core/dist/lights/DirectionalLight.svelte";
  import { onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import * as Three from "three";
  import { MathUtils, Vector3 } from "three";
  import { degToRad } from "three/src/math/MathUtils";
  import { Pane } from "tweakpane";
  import type { AppState } from "../../models/AppState.model";
  import { ConstructionType } from "../../models/Grid.model";
  import { appStore } from "../../stores";
  // import Controls from "../interface/Controls.svelte";
  import Background from "./Background.svelte";
  import Building from "./Building.svelte";
  import Road from "./Road.svelte";
  import Tile from "./surfaces/Tile.svelte";
  import Terrain from "./Terrain.svelte";
  import Tree from "./Tree.svelte";

  const scale = spring(1);
  let appState: AppState;

  const unsubscribe = appStore.subscribe((state) => (appState = state));
  onDestroy(unsubscribe);

  const camera = {
    position: {
      x: 50,
      y: appState.controls.terrain.size * 2,
      z: 50,
    },
    fov: 12,
  };

  const canvas: CanvasProps = {
    shadows: appState.graphics.shadows,
    flat: true,
    linear: true,
    rendererParameters: {
      precision: appState.graphics.precision,
      antialias: appState.graphics.antiAliasing,
      powerPreference: appState.graphics.powerPreference,
    },
  };

  const background = {
    color: "#dedede",
  };

  const orbitControl: OrbitControlsProps = {
    maxPolarAngle: degToRad(80),
    enableDamping: false,
    enableZoom: true,
    enablePan: true,
    target: {
      x: appState.controls.terrain.size / 2,
      z: appState.controls.terrain.size / 2,
    },
    autoRotate: false,
    maxDistance: 500,
  };

  const directionalLight: DirectionalLightProps = {
    color: "#ffffff",
    intensity: 1,
    visible: false,
    // shadow: {
    //   camera: {
    //     bottom: appState.controls.terrain.size / -2,
    //     left: appState.controls.terrain.size / -2,
    //     right: appState.controls.terrain.size / -2,
    //     top: appState.controls.terrain.size / -2,
    //     far: 1000,
    //     near: 1,
    //   },
    //   mapSize: [2048, 2048],
    // },
    position: { x: 5, y: 10, z: 10 },
  };

  const sunLight = {
    color: "#ffffff",
    position: {
      x: appState.controls.terrain.size / 3,
      y: appState.controls.terrain.size,
      z: appState.controls.terrain.size / 3,
    },
    intensity: 1,
    distance: 10,
    angle: MathUtils.degToRad(90),
    penumbra: 0,
    decay: 0,
    castShadow: true,
    visible: true,
    shadow: {
      mapSize: [2056, 2056],
      near: 0.1,
      far: 200,
      bias: 0.5,
    },
  };

  const sunLightHelper = {
    visible: true,
  };

  const sl = new Three.SpotLight();
  const slHelper = new Three.SpotLightHelper(sl);

  const ambientLight: AmbientLightProps = {
    color: "#ffffff",
    intensity: appState.controls.ambientLight.intensity,
    visible: true,
  };

  // GUI CONFIG
  // if (!pane) {
  if (document.querySelector(".tp-dfwv"))
    document.querySelector(".tp-dfwv").remove();
  const pane = new Pane({ title: "Scene" });

  const graphicsControls = pane.addFolder({
    title: "Camera",
    expanded: false,
  });
  graphicsControls.addInput(camera, "position");
  graphicsControls.addInput(camera, "fov");

  graphicsControls.on("change", ({ presetKey, value }) => {
    camera[presetKey] = value as any;
  });

  const bgControl = pane.addFolder({ title: "Background", expanded: false });
  bgControl.addInput(background, "color");
  bgControl.on("change", ({ presetKey, value }) => {
    background[presetKey] = value as any;
  });

  const canvasControls = pane.addFolder({ title: "Canvas", expanded: false });
  canvasControls.addInput(canvas, "shadows");
  canvasControls.addInput(canvas, "flat");
  canvasControls.addInput(canvas, "linear");

  canvasControls.on("change", ({ presetKey, value }) => {
    canvas[presetKey] = value as any;
  });

  const canvasRendererControls = pane.addFolder({
    title: "Canvas Renderer",
    expanded: false,
  });
  canvasRendererControls.addInput(canvas.rendererParameters, "antialias");
  canvasRendererControls.addInput(canvas.rendererParameters, "powerPreference");
  canvasRendererControls.addInput(canvas.rendererParameters, "precision");

  canvasRendererControls.on("change", ({ presetKey, value }) => {
    canvas.rendererParameters[presetKey] = value as any;
  });

  const orbitControls = pane.addFolder({ title: "Orbit", expanded: false });
  orbitControls.addInput(orbitControl, "maxPolarAngle");
  orbitControls.addInput(orbitControl, "autoRotate");
  orbitControls.addInput(orbitControl, "enableDamping");
  orbitControls.addInput(orbitControl, "enablePan");
  orbitControls.addInput(orbitControl, "enableZoom");
  //orbitControls.addInput(orbitControl, "target");
  orbitControls.addInput(orbitControl, "maxDistance");

  orbitControls.on("change", ({ presetKey, value }) => {
    orbitControl[presetKey] = value as any;
  });

  const directionalLightControls = pane.addFolder({
    title: "Directional Light",
    expanded: false,
  });
  directionalLightControls.addInput(directionalLight, "visible");
  directionalLightControls.addInput(directionalLight, "color");
  directionalLightControls.addInput(directionalLight, "intensity", {
    min: 0,
    max: 3,
    step: 0.1,
  });
  directionalLightControls.addInput(directionalLight, "position");

  directionalLightControls.on("change", ({ presetKey, value }) => {
    directionalLight[presetKey] = value as any;
  });

  const sunControls = pane.addFolder({
    title: "Sun Light",
    expanded: false,
  });

  sunControls
    .addInput(sunLight, "visible")
    .on("change", ({ presetKey, value }) => {
      sunLight[presetKey] = value;
    });
  sunControls.addInput(sunLight, "color", { picker: "inline" });
  sunControls.addInput(sunLight, "intensity", { min: 0, max: 4, step: 0.5 });
  sunControls.addInput(sunLight.position, "x", {
    min: -appState.controls.terrain.size,
    max: appState.controls.terrain.size * 2,
    step: 1,
  });
  sunControls.addInput(sunLight.position, "y", {
    min: 0,
    max: appState.controls.terrain.size * 4,
    step: 1,
  });
  sunControls.addInput(sunLight.position, "z", {
    min: -appState.controls.terrain.size,
    max: appState.controls.terrain.size * 2,
    step: 1,
  });
  sunControls.addInput(sunLight, "angle");
  sunControls.addInput(sunLight, "castShadow");

  sunControls.on("change", ({ presetKey, value }) => {
    sunLight[presetKey] = value as any;
  });

  const ambientLightControls = pane.addFolder({
    title: "Ambient Light",
    expanded: false,
  });
  ambientLightControls.addInput(ambientLight, "visible");
  ambientLightControls.addInput(ambientLight, "color");
  ambientLightControls.addInput(ambientLight, "intensity", {
    min: 0,
    max: 3,
    step: 0.1,
  });

  ambientLightControls.on("change", ({ presetKey, value }) => {
    ambientLight[presetKey] = value as any;
  });
</script>

<Canvas {...canvas}>
  <Background {...background} />

  <!-- <FogExp2 color={"papayawhip"} density={appState.controls.fogDensity} /> -->
  <Threlte.PerspectiveCamera {...camera}>
    <OrbitControls {...orbitControl} />
  </Threlte.PerspectiveCamera>

  <Threlte.DirectionalLight {...directionalLight} />

  <Threlte.Object3DInstance
    object={new Three.CameraHelper(
      new Three.OrthographicCamera(
        appState.controls.terrain.size / -2,
        appState.controls.terrain.size / 2,
        appState.controls.terrain.size / 2,
        appState.controls.terrain.size / -2,
        1,
        500
      )
    )}
    position={new Vector3(16, 0, 16)}
  />

  <!-- <Threlte.SpotLight {...sunLight} /> -->
  <Threlte.LightInstance light={sl} {...sunLight} />
  <Threlte.Object3DInstance object={slHelper} {...sunLightHelper} />
  <Threlte.AmbientLight {...ambientLight} />

  <!-- Terrain -->
  <Terrain />

  <!-- Tiles -->
  <Threlte.Group>
    {#each appState.grid as h, x}
      {#each h as v, y}
        <Threlte.Group>
          <Tile
            isEmpty={v.isEmpty}
            position={new Three.Vector3(
              x - 0.5,
              appState.constants.positions.tile,
              y - 0.5
            )}
          />
          {#if v.construction}
            {#if v.construction.type === ConstructionType.HOUSE}
              <Building
                position={new Three.Vector3(
                  x - 0.5,
                  appState.constants.positions.objectsFloor,
                  y - 0.5
                )}
                rotation={v.construction.rotation}
              />
            {/if}
            {#if v.construction.type === ConstructionType.ROAD}
              <Road
                position={new Three.Vector3(
                  x - 0.5,
                  appState.constants.positions.objectsFloor,
                  y - 0.5
                )}
                rotation={v.construction.rotation}
                isRightTurn={v.construction.isRightTurn}
                isLeftTurn={v.construction.isLeftTurn}
                withCrossing={v.construction.withCrossing}
              />
            {/if}
          {/if}
          {#if v.isEmpty}
            {#if Math.random() > 0.4}
              <Tree
                position={new Vector3(
                  x - 0.5,
                  appState.constants.positions.objectsFloor,
                  y - 0.5
                )}
              />
            {/if}
          {/if}
        </Threlte.Group>
      {/each}
    {/each}
  </Threlte.Group>
</Canvas>
<!-- <Controls /> -->
