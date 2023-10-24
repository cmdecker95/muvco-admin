<script lang="ts">
  export let site: string;
  export let page: string;

  const pages = {
    "/": "dashboard",
    "/patients": "patients",
    "/prospects": "prospects",
    "/appointments": "appointments",
  };

  $: pagename = pages[site];

  let hidden: boolean = true;
  let display: "hidden" | "flex";

  $: display = hidden ? "hidden" : "flex";

  const toggleMenu = () => (hidden = !hidden);
</script>

<nav
  class={`fixed inset-0 z-20 bottom-auto flex items-center justify-between bg-white${
    hidden ? "/50" : ""
  } backdrop-blur-md border-b-2 border-black px-6 py-4`}
>
  <a href="/" id="logo" class="translate-y-1"
    ><span class="text-4xl">ADMIN.</span></a
  >
  <button on:click={toggleMenu}>
    <div
      class="flex gap-3 items-center px-3 py-2 rounded-full border border-neutral-700"
    >
      <span class="text-md font-semibold capitalize">{pagename || page}</span>
      <div
        class="w-0 h-0
              border-l-[5px] border-l-transparent
              border-t-[7px] border-t-neutral-800
              border-r-[5px] border-r-transparent"
      />
    </div>
  </button>
</nav>

<aside
  class={`
  ${display} flex-col fixed inset-0 top-[74px] z-10
  bg-neutral-200/25 backdrop-blur-md text-neutral-800 text-xl font-semibold`}
>
  <div class="flex flex-col flex-grow gap-5 items-center justify-between">
    <div class="flex flex-col flex-grow w-full">
      <a
        href="/prospects"
        class="bg-white border-b-2 border-black text-2xl px-6 py-4">Prospects</a
      >
      <a
        href="/patients"
        class="bg-white border-b-2 border-black text-2xl px-6 py-4">Patients</a
      >
      <a
        href="/appointments"
        class="bg-white border-b-2 border-black text-2xl px-6 py-4"
        >Appointments</a
      >
    </div>
    <div class="flex justify-between gap-5 px-6 py-4 w-full">
      <a
        href="/signin"
        class="border-2 border-black drop-shadow-md bg-white rounded-full px-3 py-2 w-full text-center flex-grow"
        >Sign in</a
      >
      <a
        href="/signup"
        class="border-2 border-black drop-shadow-md bg-black text-white rounded-full px-3 py-2 w-full text-center flex-grow"
        >Sign up</a
      >
    </div>
  </div>
</aside>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap");

  #logo {
    font-family: Teko, sans-serif;
  }
</style>
