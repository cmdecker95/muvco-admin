<script lang="ts">
  export let prospect: import("../xata").Prospect;

  let subject = "";
  let body = "";

  let clicked;
  let submitted;
  let success;

  async function submitHandler(e: Event) {
    e.preventDefault();

    clicked = true;
    submitted = false;
    success = false;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "cmdecker95@gmail.com",
        from: "test@christiandecker.dev",
        subject,
        body,
        id: prospect.id,
      }),
    });

    submitted = true;

    if (response.status === 201) {
      success = true;
    }
  }
</script>

<form
  class="flex flex-col rounded-lg border border-black mx-6 mt-10 px-6 py-4"
  on:submit={submitHandler}
>
  <div class="flex flex-col gap-1 mb-8">
    <label for="to" class="font-semibold">To</label>
    <input
      type="email"
      name="to"
      id="to"
      class="form-input bg-slate-200 text-slate-600 rounded-md"
      value={prospect.email}
      disabled
    />
  </div>
  <div class="flex flex-col gap-1 mb-8">
    <label for="from" class="font-semibold">From</label>
    <input
      type="email"
      name="from"
      id="from"
      class="form-input bg-slate-200 text-slate-600 rounded-md"
      value="kyle@muv.co"
      disabled
    />
  </div>
  <div class="flex flex-col gap-1 mb-8">
    <label for="subject" class="font-semibold">Subject</label>
    <input
      type="text"
      name="subject"
      id="subject"
      class="form-input rounded-md"
      bind:value={subject}
    />
  </div>
  <div class="flex flex-col gap-1 mb-8 flex-grow">
    <label for="body" class="font-semibold">Body</label>
    <textarea
      name="body"
      id="body"
      class="form-textarea rounded-md flex-grow"
      bind:value={body}
    />
  </div>
  {#if submitted && success}
    <button
      class="rounded-full border border-green-600 bg-green-100 hover:bg-white focus:bg-white text-green-600 px-9 py-3 w-fit mx-auto mb-4"
    >
      <strong>Success 🎉</strong>
    </button>
  {:else if submitted}
    <button
      class="rounded-full border border-red-600 bg-red-100 hover:bg-white focus:bg-white text-red-600 px-9 py-3 w-fit mx-auto mb-4"
    >
      <strong>Error ( º﹃º )</strong>
    </button>
  {:else if clicked}
    <button
      class="rounded-full border border-black bg-white text-black px-9 py-3 w-fit mx-auto mb-4"
    >
      <strong>. . .</strong>
    </button>
  {:else}
    <button
      type="submit"
      class="flex gap-2 items-center rounded-full border border-sky-600 bg-sky-100 hover:bg-white focus:bg-white text-sky-600 px-9 py-3 w-fit mx-auto mb-4"
    >
      <svg
        class="stroke-transparent fill-sky-600"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M23.988.765a.746.746 0 0 0-.052-.291c-.008-.021-.011-.042-.021-.062a.737.737 0 0 0-.189-.243c-.012-.01-.027-.013-.04-.022-.007-.005-.01-.015-.017-.02-.015-.01-.035-.008-.051-.017a.727.727 0 0 0-.276-.092c-.028-.003-.052-.01-.08-.01a.728.728 0 0 0-.336.073c-.007.003-.015.001-.022.005l-22.5 11.75A.75.75 0 0 0 .481 13.2l7.362 2.85 1.422 7.42c.004.021.016.038.021.058a.798.798 0 0 0 .129.254c.012.015.016.034.029.049.007.008.017.01.024.018a.742.742 0 0 0 .232.168l.013.004a.73.73 0 0 0 .289.06.742.742 0 0 0 .244-.044c.022-.008.042-.021.064-.031a.72.72 0 0 0 .159-.097c.01-.008.023-.011.033-.02l5.409-4.857 5.335 1.928c.082.025.168.04.254.04a.751.751 0 0 0 .747-.682l1.75-19.5c.002-.019-.01-.035-.009-.053zm-13.737 19.89-.94-4.906 9.215-9.215-6.646 10.052a.756.756 0 0 0-.072.138z"
        />
      </svg>
      Send
    </button>
  {/if}
</form>
