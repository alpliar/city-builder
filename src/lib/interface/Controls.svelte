<script lang="ts">
  import {
    Label,
    Listgroup,
    ListgroupItem,
    SpeedDial,
    Toggle,
  } from "flowbite-svelte";
  import { onDestroy } from "svelte";
  import GoSettings from "svelte-icons/go/GoSettings.svelte";
  import { appStore } from "../../stores";

  import type { AppState } from "../../models/AppState.model";
  import ControlsInput from "./ControlsInput.svelte";

  let appState: AppState;

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
    <ListgroupItem class="flex space-x-2">
      <ControlsInput
        max={1}
        label="Light intensity"
        attribute="lightIntensity"
      />
    </ListgroupItem>
  </Listgroup>
</SpeedDial>
