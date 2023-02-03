<script lang="ts">
  import { A, ButtonGroup, Heading, P } from "flowbite-svelte";
  import { onDestroy } from "svelte";
  import MdNewReleases from "svelte-icons/md/MdNewReleases.svelte";
  import MdSave from "svelte-icons/md/MdSave.svelte";
  import Scene from "./lib/3d/Scene.svelte";
  import Button from "./lib/interface/Button.svelte";
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

{#if gameHasStarted}
  <Scene />
{:else}
  <main class="mt-10">
    <Heading
      tag="h1"
      class="mb-4"
      customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >
      Welcome to city builder
    </Heading>

    <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Here at City Builder we focus on building a new game idea. Please remember
      that you're using an alpha version.
    </P>

    <ButtonGroup class="space-x-2 mb-6 ">
      <Button color="blue" size="xl" on:click={handleClickNewGame}>
        <MdNewReleases slot="leftIcon" />
        New game
      </Button>
      <Button size="xl" on:click={() => console.error("NOT_IMPLEMENTED")}>
        <MdSave slot="leftIcon" />
        Load previous save
      </Button>
    </ButtonGroup>

    <P class="text-center">
      Check out <A
        href="https://github.com/alpliar/city-builder"
        target="_blank"
        rel="noreferrer">city-builder source code on github</A
      > !
    </P>

    <!-- <p class="read-the-docs">
      Click on the Vite and Svelte logos to learn more
    </p> -->
  </main>
{/if}

<style>
  :global(body) {
    background-image: linear-gradient(to bottom, papayawhip, burlywood);
  }

  :global(.container) {
    max-width: inherit;
  }

  :global(#app) {
    padding: 0;
    max-width: 100%;
    width: 100vw;
    height: 100vh;
  }

  main {
    padding: 10%;
    max-width: 1280px;
    margin: auto;
  }
</style>
