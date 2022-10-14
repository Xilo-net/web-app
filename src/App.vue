<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
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

.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    background-color: #f5ffef;

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
</style>