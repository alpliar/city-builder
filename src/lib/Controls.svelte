<script lang="ts">
  import { onDestroy } from "svelte";
  import { appStore } from "../stores";
  import { Toggle } from "flowbite-svelte";

  import Button from "./Button.svelte";
  import ControlsInput from "./ControlsInput.svelte";
  import type { AppState } from "../models/AppState.model";

  let appState: AppState;

  // $: pauseButtonIcon = appState.gameIsPaused ? "▶️" : "⏸️";
  $: pauseButtonLabel = appState.gameIsPaused ? "Resume" : "Pause";

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

  const toggleDayNight = (): void => {
    appStore.update((state) => ({
      ...state,
      dayNightCycle: !state.dayNightCycle,
    }));
  };
</script>

<div class="controls">
  <!-- <ControlsInput label="width" />
  <ControlsInput label="height" />
  <ControlsInput label="depth" /> -->
  <Toggle
    disabled
    size="small"
    checked={appState.dayNightCycle}
    on:change={toggleDayNight}>Day-night cycle</Toggle
  >

  <ControlsInput
    min={0}
    max={0.2}
    step={0.01}
    label="Fog density"
    attribute="fogDensity"
  />
  <ControlsInput max={1} label="Light intensity" attribute="lightIntensity" />
  <Button on:click={togglePlayPause}>
    {pauseButtonLabel}
  </Button>
</div>

<style>
  .controls {
    background-color: aliceblue;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 0.5em;
    position: fixed;
    top: 0.5em;
    left: 0.5em;
  }
</style>
