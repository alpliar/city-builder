<script lang="ts">
  import {
    Input,
    Label,
    Listgroup,
    ListgroupItem,
    SpeedDial,
    Toggle,
    Select,
  } from "flowbite-svelte";
  import { onDestroy } from "svelte";
  import GoSettings from "svelte-icons/go/GoSettings.svelte";
  import { appStore, generateGrid } from "../../stores";

  import type { AppState } from "../../models/AppState.model";
  import ControlsInput from "./ControlsInput.svelte";
  import type { SelectOptionType } from "flowbite-svelte/types";

  let appState: AppState;

  const graphicsPrecisionOptions: SelectOptionType[] = [
    { value: "lowp", name: "Low" },
    { value: "mediump", name: "Medium" },
    { value: "highp", name: "High" },
  ];

  const unsubscribe = appStore.subscribe((state) => {
    appState = state;
  });

  onDestroy(unsubscribe);

  const togglePlayPause = (): void => {
    appStore.update((state) => ({
      ...state,
      gameIsPaused: !state.gameIsPaused,
    }));
  };

  const toggleAntiAliasing = (): void => {
    appStore.update((state) => ({
      ...state,
      graphics: {
        ...state.graphics,
        antiAliasing: !state.graphics.antiAliasing,
      },
    }));
  };

  const setGraphicsPrecision = (
    precision: AppState["graphics"]["precision"]
  ): void => {
    appStore.update((state) => ({
      ...state,
      graphics: {
        ...state.graphics,
        precision,
      },
    }));
  };

  const toggleDayNight = (e = null): void => {
    appStore.update((state) => ({
      ...state,
      dayNightCycle: !state.dayNightCycle,
    }));
  };

  const toggleAutoRotate = (e = null): void => {
    appStore.update((state) => ({
      ...state,
      autoRotate: !state.autoRotate,
    }));
  };

  const handleChangeTerrainSize = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    const newGrid = generateGrid(value);

    appStore.update((state) => ({
      ...state,
      grid: newGrid,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          size: value,
        },
      },
    }));
  };

  const handleChangeTerrainDisplacementScale = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    appStore.update((state) => ({
      ...state,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          displacementScale: value,
        },
      },
    }));
  };

  const handleChangeTerrainSegments = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    appStore.update((state) => ({
      ...state,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          segments: value,
        },
      },
    }));
  };
</script>

<!-- <Card class="absolute left-0">
    <ControlsInput attribute="width" label="Building width" />
    <ControlsInput attribute="height" label="Building height" />
    <ControlsInput attribute="depth" label="Building depth" />

  </Card> -->
<SpeedDial defaultClass="absolute right-6 bottom-6" pill={false} tooltip="none">
  <span slot="icon" class="w-8 h-8">
    <GoSettings fill="currentColor" aria-hidden="true" />
  </span>

  <Listgroup class="w-64" active>
    <h3
      class="text-center bg-blue-500 text-white font-bold text-xl rounded-t-lg py-2"
    >
      Controls
    </h3>

    <h4>Graphics</h4>
    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex">
        <Toggle
          on:change={toggleAntiAliasing}
          checked={appState.graphics.antiAliasing}
        />
        Antialiasing {appState.graphics.antiAliasing ? "[ON]" : "[OFF]"}
      </Label>
    </ListgroupItem>

    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex">
        <Select
          class="mt-2"
          items={graphicsPrecisionOptions}
          bind:value={appState.graphics.precision}
        />

        Precision
      </Label>
    </ListgroupItem>

    <h4>Game</h4>
    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex">
        <Toggle on:change={toggleDayNight} checked={appState.dayNightCycle} />
        Day and night {appState.dayNightCycle ? "[ON]" : "[OFF]"}
      </Label>
    </ListgroupItem>

    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex">
        <Toggle on:change={togglePlayPause} checked={appState.gameIsPaused} />
        Pause {appState.gameIsPaused ? "[ON]" : "[OFF]"}
      </Label>
    </ListgroupItem>

    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex">
        <Toggle on:change={toggleAutoRotate} checked={appState.autoRotate} />
        Auto Rotate {appState.autoRotate ? "[ON]" : "[OFF]"}
      </Label>
    </ListgroupItem>

    <ListgroupItem class="flex space-x-2">
      <ControlsInput
        min={0}
        max={0.2}
        step={0.01}
        label={`Fog density`}
        attribute="fogDensity"
      />
    </ListgroupItem>

    <h4>Terrain</h4>
    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex items-center">
        <Input
          class="mr-2 w-1/3"
          type="number"
          bind:value={appState.controls.terrain.size}
          on:input={handleChangeTerrainSize}
        />
        <span class="w-1/2">Size</span>
      </Label>
    </ListgroupItem>
    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex items-center">
        <Input
          class="mr-2 w-1/3"
          type="number"
          bind:value={appState.controls.terrain.displacementScale}
          on:input={handleChangeTerrainDisplacementScale}
        />
        Displacement scale
      </Label>
    </ListgroupItem>
    <ListgroupItem class="flex space-x-2">
      <Label defaultClass="flex items-center">
        <Input
          class="mr-2 w-1/3"
          type="number"
          bind:value={appState.controls.terrain.segments}
          on:input={handleChangeTerrainSegments}
        />
        Segments
      </Label>
    </ListgroupItem>

    <!-- <h4>Lights</h4>
    <ListgroupItem class="flex space-x-2">
      <ControlsInput
        max={1}
        label="Light intensity"
        attribute="lightIntensity"
      />
    </ListgroupItem> -->
  </Listgroup>
</SpeedDial>
