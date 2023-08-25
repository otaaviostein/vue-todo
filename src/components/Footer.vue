<script setup lang="ts">
import defaults from '../composables/defaults'
</script>

<template>
  <footer class="dark:color-gray-400">
    <div
      class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col"
    >
      <a
        class="flex title-font font-medium items-center md:justify-start justify-center"
      >
        <span class="ml-3 text-xl">{{ defaults.title }}</span>
      </a>
    </div>
  </footer>
</template>
