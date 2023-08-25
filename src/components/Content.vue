<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/tasks'
import List from './List.vue'
import ListHeader from './ListHeader.vue'
import ListItemAdd from './ListItemAdd.vue'

const tasks = useTaskStore()

onMounted(() => {
  tasks.fetchAll()
})
</script>

<template>
  
  <section class="container mx-auto flex flex-wrap px-4">
    <div class="w-full py-6 lg:pr-10 lg:mb-0">
      <ListHeader>
        <template #title>Create a new task!</template>
      </ListHeader>
      <ListItemAdd></ListItemAdd>
      <template v-if="tasks.uncompleted.length">
        <ListHeader>
          <template #title>Uncompleted tasks</template>
        </ListHeader>
        <List :tasks="tasks.uncompleted"></List>
      </template>
      <template v-if="tasks.completed.length">
        <ListHeader>
          <template #title>Completed tasks</template>
        </ListHeader>
        <List :tasks="tasks.completed"></List>
      </template>
    </div>
    <div class="w-full mb-6 xl:w-2/8 lg:py-6 lg:mb-0 sticky">
    </div>
  </section>
</template>
