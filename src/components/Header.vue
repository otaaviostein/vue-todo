<script setup lang="ts">
import defaults from '../composables/defaults'
</script>

<template>
  <header
    class="text-gray-600 body-font"
    :style="{ background: defaults.brand_gradient }"
  >
    <div
      class="container mx-auto flex flex-wrap py-5 px-5 flex-col lg:flex-row items-center"
    >
      <router-link
        to="/"
        class="flex title-font font-medium items-center text-gray-900"
      >
        <span class="ml-3 text-white text-xl">{{ defaults.title }}</span>
      </router-link>
    </div>
  </header>
</template>
