<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Input,
    Label,
    Listgroup,
    Select,
    SpeedDial,
    SpeedDialButton,
    Toggle,
  } from "flowbite-svelte";
  import { onDestroy, SvelteComponent } from "svelte";
  import GoSettings from "svelte-icons/go/GoSettings.svelte";
  import { appStore, generateGrid } from "../../stores";

  import type { SelectOptionType } from "flowbite-svelte/types";
  import GiMountainCave from "svelte-icons/gi/GiMountainCave.svelte";
  import GoDeviceCameraVideo from "svelte-icons/go/GoDeviceCameraVideo.svelte";
  import { Md3DRotation } from "svelte-icons/md/";
  import TiMediaPause from "svelte-icons/ti/TiMediaPause.svelte";
  import WiDaySnowThunderstorm from "svelte-icons/wi/WiDaySnowThunderstorm.svelte";
  import type { AppState } from "../../models/AppState.model";

  let appState: AppState;

  const graphicsPrecisionOptions: SelectOptionType[] = [
    { value: "lowp", name: "Low" },
    { value: "mediump", name: "Medium" },
    { value: "highp", name: "High" },
  ];

  const unsubscribe = appStore.subscribe((state) => {
    appState = state;
  });

  onDestroy(unsubscribe);

  const togglePlayPause = (): void => {
    appStore.update((state) => ({
      ...state,
      gameIsPaused: !state.gameIsPaused,
    }));
  };

  const toggleAntiAliasing = (): void => {
    appStore.update((state) => ({
      ...state,
      graphics: {
        ...state.graphics,
        antiAliasing: !state.graphics.antiAliasing,
      },
    }));
  };
  const toggleShadows = (): void => {
    appStore.update((state) => ({
      ...state,
      graphics: {
        ...state.graphics,
        shadows: !state.graphics.shadows,
      },
    }));
  };

  const setGraphicsPrecision = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const value = input.value as AppState["graphics"]["precision"];

    appStore.update((state) => ({
      ...state,
      graphics: {
        ...state.graphics,
        precision: value,
      },
    }));
  };

  const toggleDayNight = (e = null): void => {
    appStore.update((state) => ({
      ...state,
      dayNightCycle: !state.dayNightCycle,
    }));
  };

  const toggleAutoRotate = (e = null): void => {
    appStore.update((state) => ({
      ...state,
      autoRotate: !state.autoRotate,
    }));
  };

  const handleChangeTerrainSize = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    const newGrid = generateGrid(value);

    appStore.update((state) => ({
      ...state,
      grid: newGrid,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          size: value,
        },
      },
    }));
  };

  const handleChangeTerrainDisplacementScale = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    appStore.update((state) => ({
      ...state,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          displacementScale: value,
        },
      },
    }));
  };

  const handleChangeTerrainSegments = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    const value = Number(target.value);

    appStore.update((state) => ({
      ...state,
      controls: {
        ...state.controls,
        terrain: {
          ...state.controls.terrain,
          segments: value,
        },
      },
    }));
  };

  interface Control {
    name: string;
    type: "input" | "toggle" | "select";
    onChange: (() => void) | ((e: Event) => void);
    booleanValue?: boolean;
    value?: number | string;
    options?: SelectOptionType[];
  }
  interface ControlCategory {
    name: string;
    icon: ConstructorOfATypedSvelteComponent;
    controls: Control[];
  }

  const controlCategories: ControlCategory[] = [
    // {
    //   name: "Camera",
    //   icon: GoDeviceCameraVideo,
    //   controls: [
    //   ],
    // },
    // {
    //   name: "Game",
    //   icon: GiGamepad,
    //   controls: [
    //     {
    //   ],
    // },
    {
      name: "Graphics",
      icon: GoDeviceCameraVideo,
      controls: [
        {
          name: "Shadows",
          type: "toggle",
          onChange: toggleShadows,
          booleanValue: appState.graphics.shadows,
        },
        {
          name: "Antialiasing",
          type: "toggle",
          onChange: toggleAntiAliasing,
          booleanValue: appState.graphics.antiAliasing,
        },
        {
          name: "Shaders Precision",
          type: "select",
          onChange: setGraphicsPrecision,
          value: appState.graphics.precision,
          options: graphicsPrecisionOptions,
        },
      ],
    },
    {
      name: "Terrain",
      icon: GiMountainCave,
      controls: [
        {
          name: "Size",
          type: "input",
          onChange: handleChangeTerrainSize,
          value: appState.controls.terrain.size,
        },
        {
          name: "Elevation",
          type: "input",
          onChange: handleChangeTerrainDisplacementScale,
          value: appState.controls.terrain.displacementScale,
        },
        {
          name: "Segments",
          type: "input",
          onChange: handleChangeTerrainSegments,
          value: appState.controls.terrain.segments,
        },
      ],
    },
    {
      name: "Conditions",
      icon: WiDaySnowThunderstorm,
      controls: [
        {
          name: "Day & Night cycle",
          type: "toggle",
          onChange: toggleDayNight,
          booleanValue: appState.dayNightCycle,
        },
      ],
    },
  ];
</script>

<SpeedDial defaultClass="absolute right-6 bottom-6" pill={false} tooltip="none">
  <span slot="icon" class="w-8 h-8">
    <GoSettings fill="currentColor" aria-hidden="true" />
  </span>
  <Listgroup class="w-64" active>
    <h3
      class="text-center bg-blue-500 text-white font-bold text-xl rounded-t-lg py-2"
    >
      Controls
    </h3>
    <Accordion>
      {#each controlCategories as category}
        <AccordionItem>
          <span slot="header" class="flex gap-2 items-center">
            <span class="w-4 h-4">
              <svelte:component this={category.icon} />
            </span>
            <span> {category.name}</span>
          </span>
          <div class="grid gap-2">
            {#each category.controls as control}
              {#if control.type === "toggle"}
                <Label class="flex">
                  <Toggle
                    size="small"
                    on:change={control.onChange}
                    checked={control.booleanValue}
                  />
                  {control.name}
                  <!-- {control.value ? "[ON]" : "[OFF]"} -->
                </Label>
              {:else if control.type === "select"}
                <Label defaultClass="flex">
                  <Select
                    underline
                    size="sm"
                    items={control.options}
                    bind:value={control.value}
                    on:change={control.onChange}
                  />
                  {control.name}
                </Label>
              {:else if control.type === "input"}
                <Label defaultClass="flex items-center">
                  <Input
                    type="number"
                    bind:value={control.value}
                    on:input={control.onChange}
                  />
                  <span class="w-1/2">{control.name}</span>
                </Label>
              {/if}
            {/each}
          </div>
        </AccordionItem>
      {/each}
    </Accordion>
    <!-- <Accordion>

      <h4>Terrain</h4>
      <AccordionItem class="flex space-x-2">
        <h4>Lights</h4>
        <ControlsInput
          max={1}
          label="Light intensity"
          attribute="lightIntensity"
        />
      </AccordionItem>

      <AccordionItem class="flex space-x-2">
        <h4>Weather</h4>
        <ControlsInput
          min={0}
          max={0.2}
          step={0.01}
          label={`Fog density`}
          attribute="fogDensity"
        />
      </AccordionItem>
    </Accordion> -->
  </Listgroup>
  <Listgroup
    style="background: transparent !important; border: none !important;"
  >
    <SpeedDialButton
      tooltip="left"
      name="Play / Pause"
      on:click={togglePlayPause}
      style={appState.gameIsPaused
        ? `background-color: rgb(26, 86, 219, 1); color: white;`
        : undefined}
    >
      <TiMediaPause fill="currentColor" aria-hidden="true" />
    </SpeedDialButton>
    <SpeedDialButton
      tooltip="left"
      name="Auto rotate"
      on:click={toggleAutoRotate}
      style={appState.autoRotate
        ? `background-color: rgb(26, 86, 219, 1); color: white;`
        : undefined}
    >
      {#if appState.autoRotate}
        <Md3DRotation />
      {:else}
        <Md3DRotation fill="currentColor" aria-hidden="true" />
      {/if}
    </SpeedDialButton>
  </Listgroup>
</SpeedDial>
