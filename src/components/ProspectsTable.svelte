<script>
  import { onMount } from "svelte";

  let prospects = [];
  let loading = true;
  let error = null;

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/prospects`);
      prospects = await response.json();
      prospects = prospects.sort(
        (a, b) =>
          new Date(b.xata.createdAt).getTime() -
          new Date(a.xata.createdAt).getTime()
      );
    } catch (err) {
      error = err.message || "An error occurred";
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    fetchData();
  });
</script>

{#if loading}
  <p class="mx-6 my-4">Loading...</p>
{:else if error}
  <p class="mx-6 my-4">Error: {error}</p>
{:else if prospects.length > 0}
  <div class="flex flex-col gap-4 mx-6">
    {#each prospects as prospect, i (prospect.id)}
      <a
        href={`/prospects/${prospect.id}`}
        class={`flex flex-col gap-2 rounded-lg border border-black bg-neutral-100 hover:bg-white px-6 py-4`}
      >
        <span class="font-semibold">
          {`${prospect.first} ${prospect.last}`}
        </span>
        {#if prospect.contacted}
          <span class="text-green-600"> Contacted </span>
        {:else}
          <span class="text-neutral-600"> Not contacted </span>
        {/if}
      </a>
    {/each}
  </div>
{:else}
  <p class="mx-6 my-4">No prospects found.</p>
{/if}
