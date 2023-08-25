<script setup lang="ts">
import {
  canSaveTask,
  getWords,
  randomInt
} from '../composables/utils'
import { format, addDays } from 'date-fns'
import { computed, watch, ref } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { v4 as uuidv4 } from 'uuid';
import { NotificationProvider, dispatchNotification } from './Notification';

const tasks = useTaskStore()
const date = ref(format(new Date(), 'yyyy-MM-dd'))
const title = ref('')
const description = ref('')
const canCreateTask = computed(() => canSaveTask(title.value))

function createFakeTask() {
  title.value = getWords(4, 7)
  description.value = getWords(10, 17)
  date.value = format(addDays(new Date(), randomInt(0, 5)), 'yyyy-MM-dd')
}

function createTask() {
  if (canCreateTask.value) {
    tasks.create({
      title: title.value,
      description: description.value,
      date: new Date(),
      completed: false,
      id: uuidv4()
    })
    title.value = ''
    description.value = ''
    dispatchNotification({ title: 'Success!', content: 'Task created', type: 'success' });
  }
}
</script>

<template>
  <div
    class="flex p-8 rounded flex-wrap md:mb-8 md:flex-nowrap hover:opacity-100"
  >
    <div class="flex-grow">
      <div class="relative flex-auto">
        <div class="flex items-center align-center -mt-2">
          <!-- TITLE -->
          <input
            data-test="add-new-task-title"
            v-model="title"
            placeholder="Enter new task title..."
            class="flex grow outline-none cursor-text text-2xl font-medium title-font"
          >
        </div>
        <!-- DESCRIPTION -->
        <input
          data-test="add-new-task-description"
          @keyup.enter="createTask"
          v-model="description"
          placeholder="Enter new task description..."
          class="flex grow outline-none cursor-text leading-relaxed mt-5"
        />
        <div class="flex justify-end flex-row flex-wrap mt-8">
          <span class="inline-flex w-full mt-8 sm:mt-0 sm:w-auto">
            <!-- CREATE FAKE TASK -->
            <a
              href="#"
              @click.prevent="createFakeTask"
              class="text-sm bg-gray-900 text-white py-1 dark:bg-white dark:text-gray-900 px-3 rounded inline-flex items-center"
              >Fake task</a
            >
            <!-- CREATE TASK -->
            <NotificationProvider>
              <a
                data-test="add-new-task-button"
                href="#"
                @click.prevent="createTask"
                class="text-sm bg-brand-primary text-white py-1 px-3 ml-3 rounded inline-flex items-center"
                :class="
                  canCreateTask
                    ? ''
                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                "
                >Create task</a
              >
            </NotificationProvider>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
