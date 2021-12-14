<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: number;
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center gap-4">
    {#if label}
      <label for={name} class="text-sm font-semibold uppercase">{label}</label>
    {/if}
    
    <input type="number" {name} id={name} bind:value {...$$restProps} class="w-20 p-1 text-center rounded-md ring-blue-600 focus:ring-2 focus:outline-none">
  </div>

  <slot/>
</div>
