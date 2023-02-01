<script lang="ts">
  import { onDestroy } from "svelte";
  import { appStore } from "../stores";

  export let min: number = 0.1,
    max: number = 3,
    step: number = 0.1,
    attribute: string,
    label: string;

  let value;

  const unsubscribe = appStore.subscribe(
    (state) => (value = state.controls[label])
  );

  onDestroy(unsubscribe);

  const handleInput = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;

    appStore.update((state) => ({
      ...state,
      controls: {
        ...state.controls,
        [attribute]: Number(value),
      },
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
