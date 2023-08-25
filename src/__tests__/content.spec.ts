/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Content from '../components/Content.vue'; 
import { Task } from '../types';

type TaskStore = {
  fetchAll: jest.Mock<void, []>;
  uncompleted: Task[];
  completed: Task[];
};

const mockUseTaskStore: TaskStore = {
  fetchAll: jest.fn(),
  uncompleted: [],
  completed: [],
};


jest.mock('../stores/tasks', () => ({
  useTaskStore: jest.fn(() => mockUseTaskStore),
}));

describe('MyComponent', () => {
  it('renders without errors', () => {
    const wrapper = mount(Content);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls fetchAll method on mount', async () => {
    const fetchAllMock = jest.fn();
    const useTaskStoreMock = jest.requireMock('../stores/tasks').useTaskStore;
    useTaskStoreMock().fetchAll = fetchAllMock;
    
    const wrapper = mount(Content);
    await wrapper.vm.$nextTick();

    expect(fetchAllMock).toHaveBeenCalled();
  });

  it('renders ListHeader and ListItemAdd components', () => {
    const wrapper = mount(Content);

    expect(wrapper.findComponent({ name: 'ListHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ListItemAdd' }).exists()).toBe(true);
  });
});
