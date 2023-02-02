<script lang="ts">
  import { Label, Range } from "flowbite-svelte";
  import { onDestroy } from "svelte";
  import { appStore } from "../../stores";

  export let min: number = 0.1,
    max: number = 3,
    step: number = 0.1,
    attribute: string,
    label: string;

  let value;

  const unsubscribe = appStore.subscribe(
    (state) => (value = state.controls[attribute])
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

<Label defaultClass="flex space-x-2">
  <Range
    size="md"
    class="w-16"
    on:change={handleInput}
    on:keyup={handleInput}
    bind:value
    {min}
    {max}
    {step}
  />
  <span>{`${label} (${value})`}</span>
</Label>

<style>
</style>
