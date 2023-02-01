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
  <ControlsInput max={1} label="fogDensity" />
  <ControlsInput max={1} label="lightIntensity" />
  <button on:click={togglePlayPause}>{pauseButtonLabel}</button>
</div>

<style>
  .controls {
    background-color: aliceblue;
    padding: 1em;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
