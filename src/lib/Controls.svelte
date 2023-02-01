<script lang="ts">
  import { onDestroy } from "svelte";
  import { appStore } from "../stores";
  import ControlsInput from "./ControlsInput.svelte";

  let gameIsPaused: boolean;
  $: pauseButtonLabel = gameIsPaused ? "Resume" : "Pause";

  const unsubscribe = appStore.subscribe((state) => {
    gameIsPaused = state.gameIsPaused;
  });

  onDestroy(unsubscribe);

  const togglePlayPause = (): void => {
    appStore.update((state) => ({
      ...state,
      gameIsPaused: !state.gameIsPaused,
    }));
  };
</script>

<div class="controls">
  <!-- <ControlsInput label="width" />
  <ControlsInput label="height" />
  <ControlsInput label="depth" /> -->
  <ControlsInput
    min={0}
    max={0.2}
    step={0.01}
    label="Fog density"
    attribute="fogDensity"
  />
  <ControlsInput max={1} label="Light intensity" attribute="lightIntensity" />
  <button on:click={togglePlayPause}>{pauseButtonLabel}</button>
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
