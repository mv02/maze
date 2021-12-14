<script lang="ts">
  import { onMount } from 'svelte';
  import Maze from './maze';

  let canvas: HTMLCanvasElement;
  onMount(() => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    const m = new Maze();
    m.draw(ctx);
    m.solve();
    m.drawSolution(ctx);
  });
</script>

<div class="container flex items-center justify-center min-h-screen mx-auto">
  <canvas width="600" height="600" bind:this={canvas}></canvas>
</div>
