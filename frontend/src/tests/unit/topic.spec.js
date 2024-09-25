import { shallowMount } from '@vue/test-utils';
import Topic from '@/components/Homepage/Topic/topic.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'; // 导入vue-router

jest.mock('axios');

// 创建一个模拟的router
const router = createRouter({
  history: createWebHistory(),
  routes: []
});

describe('Topic.vue', () => {
  let wrapper;

  beforeEach(async () => {
    global.alert = jest.fn();  // 模拟window.alert
    wrapper = shallowMount(Topic, {
      global: {
        plugins: [router],  // 添加 router 插件
        mocks: {
          $router: {
            push: jest.fn()
          }
        }
      }
    });

    await router.isReady(); // 确保router已准备好
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.card-container').exists()).toBe(true);
  });

  it('displays the correct default state', () => {
    expect(wrapper.vm.cards).toEqual([]);
    expect(wrapper.vm.selectedCategory).toBe('');
  });

  it('fetches topics when mounted', async () => {
    const mockData = [
      { topicTitle: 'Algorithm', topicDescription: 'Algorithms Basics', category: 'Algorithm' },
      { topicTitle: 'Supervised Learning', topicDescription: 'Introduction to Supervised Learning', category: 'Supervised' }
    ];
    
    // 模拟axios返回的数据
    axios.get.mockResolvedValue({ data: mockData });

    await wrapper.vm.fetchTopics();

    expect(wrapper.vm.cards).toEqual(mockData);
  });

  it('filters cards based on selected category', async () => {
    const mockData = [
      { topicTitle: 'Algorithm', topicDescription: 'Algorithms Basics', category: 'Algorithm' },
      { topicTitle: 'Supervised Learning', topicDescription: 'Introduction to Supervised Learning', category: 'Supervised' }
    ];
    
    wrapper.setData({ cards: mockData });
    wrapper.setData({ selectedCategory: 'Algorithm' });

    expect(wrapper.vm.filteredCards).toEqual([{ topicTitle: 'Algorithm', topicDescription: 'Algorithms Basics', category: 'Algorithm' }]);
  });

  it('navigates to the correct route on card click', async () => {
    const mockData = [
      { topicTitle: 'Algorithm', topicDescription: 'Algorithms Basics', category: 'Algorithm' }
    ];

    wrapper.setData({ cards: mockData });
    const card = wrapper.find('.card');
    await card.trigger('click');

    // 确保$router.push被调用了
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'Context',
      query: { formattedTitle: 'Algorithm' }
    });
  });

  it('displays an error message if fetching topics fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchTopics();

    // 检查alert是否被调用
    expect(global.alert).toHaveBeenCalledWith('Failed to load data. Please try again later.');
  });
});
