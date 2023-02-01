<script lang="ts">
  import { onDestroy } from "svelte";
  import { controlsStore } from "../stores";

  export let min: number = 0.1,
    max: number = 3,
    step: number = 0.1,
    label: string;

  let value;

  const unsubscribe = controlsStore.subscribe(
    (controls) => (value = controls[label])
  );

  onDestroy(unsubscribe);

  const handleInput = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;

    controlsStore.update((controls) => ({
      ...controls,
      [label]: Number(value),
    }));
  };
</script>

<label>
  <input on:input={handleInput} type="range" bind:value {min} {max} {step} />
  {label}
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }
  .controls label input {
    max-width: 60%;
  }
</style>
