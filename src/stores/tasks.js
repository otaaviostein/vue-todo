import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: []
  }),
  getters: {
    item:
      ({ items }) =>
      (id) =>
        items.find((item) => item.id === id),
    completed: ({ items }) => items.filter(({ completed }) => completed),
    uncompleted: ({ items }) => items.filter(({ completed }) => !completed)
  },
  actions: {
    async fetchAll() {
      this.items = JSON.parse(localStorage.getItem('_vue3-todo-list_list') || '[]')
    },
    async setTasksToLocalStorage(task) {
      localStorage.setItem('_vue3-todo-list_list', JSON.stringify(task))
    },
    async create(input) {
      if (!input) return
      this.items = JSON.parse(localStorage.getItem('_vue3-todo-list_list') || '[]')
      this.items.push(input)
      
      this.setTasksToLocalStorage(this.items)
      this.fetchAll()
    },
    async update(id, input) {
      const index = this.items.findIndex((item) => item.id === id)
      this.items[index] = input

      this.setTasksToLocalStorage(this.items)
      this.fetchAll()
    },
    async delete(id) {
      const index = this.items.findIndex((item) => item.id === id)
      this.items.splice(index, 1)
      
      this.setTasksToLocalStorage(this.items)
      this.fetchAll()
    }
  }
})
