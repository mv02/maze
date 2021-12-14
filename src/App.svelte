<script lang="ts">
  import { onMount } from 'svelte';
  import NumberInput from './NumberInput.svelte';
  import Maze from './maze';

  let size: number = 20;
  let maze: Maze;
  let solved: boolean = false;

  let container: Element;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  onMount(() => {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    generate();
  });

  function generate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.height = Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ) - 2 * +window.getComputedStyle(container).padding.replace('px', '');

    maze = new Maze(size, canvas.width / size, canvas.width / size / 5);
    solved = false;
    maze.draw(ctx);
    maze.solve();
  }

  $: if (maze) {
    try {
      solved ? maze.drawSolution(ctx) : maze.draw(ctx);
    }
    catch (e) {
      console.error(e);
    }
  }
</script>

<div bind:this={container} class="container flex flex-col items-center justify-around min-h-screen gap-4 p-4 mx-auto sm:flex-row">
  <div class="flex flex-col gap-4 p-4 bg-gray-300 rounded-md">
    <NumberInput label="Maze size" name="size" bind:value={size} min="5" max="50">
      <input type="range" name="size-range" bind:value={size} min="5" max="50" step="5">
    </NumberInput>

    <div class="flex justify-end">
      <button on:click={generate} class="btn">Generate</button>
    </div>

    <div class="flex items-center gap-2">
      <input type="checkbox" id="solved" bind:checked={solved}>
      <label for="solved" class="text-sm">Show solution</label>
    </div>
  </div>

  <canvas bind:this={canvas} class="rounded-sm"></canvas>
</div>
