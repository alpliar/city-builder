<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { ButtonProps } from "flowbite-svelte/buttons/Button.svelte";
  import { createEventDispatcher } from "svelte";
  export let defaultClass: ButtonProps["defaultClass"] = undefined;
  export let size: ButtonProps["size"] = "md";
  export let color: ButtonProps["color"] = "light";
  $: iconClass = size === "md" ? "w-3 h-3 mr-2" : "w-6 h-6 mr-2";

  const dispatch = createEventDispatcher();

  const handleClick = (): void => {
    dispatch("click");
  };
</script>

<Button class={defaultClass} on:click={handleClick} {size} {color}>
  {#if $$slots.leftIcon}
    <span class={iconClass}>
      <slot name="leftIcon" />
    </span>
  {/if}
  <slot />
</Button>
