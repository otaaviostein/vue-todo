<script setup lang="ts">
import { Task } from '../types'
import { convertToSingleLine, canSaveTask } from '../composables/utils'
import { computed, reactive, onMounted } from 'vue'
import { useTaskStore } from '../stores/tasks'
import ModalWrapper from './ModalWrapper.vue'
import { dispatchNotification } from './Notification'

const props = defineProps<{ id: string }>()
const tasks = useTaskStore()
const task = tasks.item(props.id)
const updatedTask = reactive(Object.assign({}, task))

const canCreateTask = computed(() =>
  canSaveTask(updatedTask.title)
)

const emits = defineEmits<{
  (event: 'close-modal'): void
  (event: 'update-task', task: Task): void
  (event: 'delete-task'): void
}>()

function closeModal() {
  emits('close-modal')
}

function deleteTask() {
  emits('delete-task')
  closeModal()
}

function updateTask() {
  if (canCreateTask.value) {
    emits('update-task', updatedTask)
    closeModal()
    dispatchNotification({ title: 'Success!', content: 'Task Updated', type: 'success' });
  }
}
</script>

<template>
  <ModalWrapper @closeModal="closeModal">
    <template v-slot:title>Updating task {{ updatedTask.id }}</template>
    <template v-slot:content>
      <div class="relative py-12 flex-auto px-8">
        <div class="flex -mt-2">
          <!-- COMPLETED -->
          <label class="form-control">
            <input
              data-test="edit-task-completed"
              type="checkbox"
              class="checked:bg-brand-primary mr-3 mt-1.8"
              v-model="updatedTask.completed"
            />
          </label>
          <!-- TITLE -->
          <input
            data-test="edit-task-title"
            v-model="updatedTask.title"
            placeholder="Enter new task title..."
            class="flex grow outline-none cursor-text text-2xl font-medium title-font"
          >
        </div>
        <!-- DESCRIPTION -->
        <input
          data-test="edit-task-description"
          v-model="updatedTask.description"
          placeholder="Enter task description..."
          class="flex grow outline-none leading-relaxed mt-2 empty:before:content-[attr(placeholder)] dark:text-gray-400"
        >
      </div>
    </template>
    <template v-slot:footer>
      <!-- DELETE TASK -->
      <a
        data-test="delete-task-button"
        href="#"
        @click.prevent="deleteTask"
        class="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 py-1 px-3 rounded inline-flex items-center ml-3"
        >Delete task</a
      >
      <!-- UPDATE TASK -->
      <a
        data-test="edit-task-button"
        href="#"
        @click.prevent="updateTask"
        class="text-sm bg-brand-primary text-white py-1 px-3 rounded inline-flex items-center float-right ml-3"
        :class="{
          'bg-gray-400': !canCreateTask,
          'cursor-not-allowed': !canCreateTask
        }"
        >Update task</a
      >
    </template>
  </ModalWrapper>
</template>
