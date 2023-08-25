/**
 * @jest-environment jsdom
 */

import { shallowMount, VueWrapper } from '@vue/test-utils'
import List from '../components/List.vue'
import { Task } from '../types'

describe('ListItem.vue', () => {
  it('renders a list item for each task', () => {
    const tasks: Task[] = [
      { 
        id: '1', 
        title: 'Task 1',
        description: 'Task 1',
        date: '11/11/2000',
        completed: false,
        categoryId: '1',
        category: '1'
       },
       { 
        id: '2', 
        title: 'Task 2',
        description: 'Task 2',
        date: '11/11/2000',
        completed: true,
        categoryId: '2',
        category: '2'
       },
    ]

    const wrapper: VueWrapper<any> = shallowMount(List, {
      props: { tasks }
    })
    const listItems = wrapper.findAll('.list-item')
    
    expect(listItems.length).toBe(tasks.length)
  })

})
