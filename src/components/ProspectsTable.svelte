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
  <table class="border-2 border-black mx-6 my-4">
    <thead class="border-b-2 border-black bg-neutral-200">
      <tr class="divide-x-2 divide-black text-left font-semibold">
        <th class="px-4 py-2">Date</th>
        <th class="px-4 py-2">Name</th>
      </tr>
    </thead>
    <tbody class="divide-y-2 divide-black">
      {#each prospects as prospect, i (prospect.id)}
        <a
          href={`/prospects/${prospect.id}`}
          class={`table-row divide-x-2 divide-black hover:bg-neutral-100`}
        >
          <td class={`px-6 py-4`}>
            {new Date(prospect.xata.createdAt).toLocaleDateString()}
          </td>
          <td class="px-6 py-4">
            {`${prospect.first} ${prospect.last}`}
          </td>
        </a>
      {/each}
    </tbody>
  </table>
{:else}
  <p class="mx-6 my-4">No prospects found.</p>
{/if}
