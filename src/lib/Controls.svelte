<script lang="ts">
  import ControlsInput from "./ControlsInput.svelte";
</script>

<div class="controls">
  <ControlsInput label="width" />
  <ControlsInput label="height" />
  <ControlsInput label="depth" />
  <ControlsInput max={1} label="fogDensity" />
  <ControlsInput max={1} label="lightIntensity" />
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
