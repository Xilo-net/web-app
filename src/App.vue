<script setup>
import Sidebar from "./components/Sidebar.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar v-if="!!userStore.user" />
    <main class="p-0 flex-1 md:pl-24 md:p-8">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --primary: #9fe271;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #44405d;
  --dark-alt: #5b5779;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

main {
  background-color: #f5ffef;
}
</style>