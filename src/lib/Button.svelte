<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { ButtonProps } from "flowbite-svelte/buttons/Button.svelte";
  import { createEventDispatcher } from "svelte";
  export let defaultClass: ButtonProps["defaultClass"] = undefined;
  export let size: ButtonProps["size"] = "md";
  $: iconClass = size === "md" ? "w-3 h-3" : "w-5 h-5";

  const dispatch = createEventDispatcher();

  const handleClick = (): void => {
    dispatch("click");
  };
</script>

<Button class={defaultClass} on:click={handleClick} {size}>
  {#if $$slots.leftIcon}
    <span class={iconClass}>
      <slot name="leftIcon" />
    </span>
  {/if}
  <slot />
</Button>
