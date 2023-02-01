<script lang="ts">
  import { onDestroy } from "svelte";
  import Scene from "./lib/Scene.svelte";
  import { appStore } from "./stores";
  let gameHasStarted: boolean = false;

  const unsubscribe = appStore.subscribe(
    (state) => (gameHasStarted = state.gameHasStarted)
  );

  onDestroy(unsubscribe);

  const handleClickNewGame = (): void => {
    appStore.update((state) => ({
      ...state,
      gameHasStarted: true,
    }));
  };
</script>

<main>
  {#if gameHasStarted}
    <Scene />
  {:else}
    <h1>Welcome to city-builder !</h1>

    <div class="card">
      <div class="buttons">
        <button class="new-game" on:click={handleClickNewGame}>New city</button>
        <button disabled on:click={() => console.error("NOT_IMPLEMENTED")}>
          Load previous save
        </button>
      </div>
      <!-- <Counter /> -->
      <p>
        Check out <a
          href="https://github.com/alpliar/city-builder"
          target="_blank"
          rel="noreferrer">city-builder source code on github</a
        > !
      </p>
    </div>

    <!-- <p class="read-the-docs">
      Click on the Vite and Svelte logos to learn more
    </p> -->
  {/if}
</main>

<style>
  h1 {
    font-weight: bold;
    font-size: "xx-large";
  }
  :global(body) {
    background-image: linear-gradient(to bottom, papayawhip, burlywood);
  }

  .card {
    background: white;
    padding: 1em;
    border-radius: 1em;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 20em;
    margin: auto;
  }

  button {
    height: 4em;
    font-size: 1.3em;
    font-weight: bold;
    filter: opacity(1);
  }
  button:hover {
    filter: opacity(0.9);
  }

  .new-game {
    color: white;
    background-color: #cf4010;
    will-change: filter;
  }

  /* .read-the-docs {
    color: #888;
  } */
</style>
