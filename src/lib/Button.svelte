<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const handleClick = (): void => {
    dispatch("click");
  };
</script>

<button on:click={handleClick}>
  <slot />
</button>
