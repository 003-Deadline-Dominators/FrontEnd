import { shallowMount } from '@vue/test-utils';
import ProblemSection from '@/components/question/ProblemSection.vue';
import axios from 'axios';

// 模拟 axios 以避免真实的 API 调用
jest.mock('axios');

describe('ProblemSection.vue', () => {
  let wrapper;

  beforeEach(() => {
    // 模拟 API 响应的情境和提示数据
    axios.get.mockResolvedValueOnce({
      data: { scenario: 'Mocked Scenario Text', task: 'Mocked Task Text' },
    });

    axios.get.mockResolvedValueOnce({
      data: { hints: ['Hint 1', 'Hint 2'] },
    });

    // 使用 shallowMount 来挂载组件，同时模拟 $route
    wrapper = shallowMount(ProblemSection, {
      props: {
        dragDropLoaded: false,
      },
      global: {
        mocks: {
          $route: {
            query: {
              topicTitle: 'Sample Topic',
              contextTitle: 'Sample Context',
            },
          },
        },
      },
    });
  });

  // 测试组件是否正确渲染
  it('正确渲染组件', () => {
    expect(wrapper.find('.scenario-title').exists()).toBe(true);
    expect(wrapper.find('.task-title').exists()).toBe(true);
    expect(wrapper.find('.hint-title').exists()).toBe(true);
  });

  // 测试是否在挂载时调用 fetchProblemData
  it('在挂载时获取情境和任务数据', async () => {
    // 等待挂载时的 API 调用完成
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // 增加一个 nextTick 确保数据完全加载

    expect(wrapper.vm.scenario).toBe('Mocked Scenario Text');
    expect(wrapper.vm.task).toBe('Mocked Task Text');
    expect(wrapper.find('.scenario').text()).toContain('Scenario');
    expect(wrapper.find('.task').text()).toContain('Task');
  });

  // 测试当 dragDropLoaded 变为 true 时是否获取提示
  it('当 dragDropLoaded 设置为 true 时获取提示', async () => {
    // 更改 prop 为 true 以触发提示获取
    await wrapper.setProps({ dragDropLoaded: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.hint).toEqual(['Hint 1', 'Hint 2']);
    expect(wrapper.find('.hint').text()).toContain('Hint');
  });

  // 测试提示的可见性切换
  it('点击时切换提示的可见性', async () => {
    // 设置提示数据并使提示不可见
    wrapper.setData({ hint: ['Hint 1', 'Hint 2'], isHintVisible: false });
    await wrapper.vm.$nextTick();

    // 点击显示提示
    await wrapper.find('.hint').trigger('click');
    expect(wrapper.vm.isHintVisible).toBe(true);
    expect(wrapper.findAll('.hint p').length).toBe(2);

    // 再次点击隐藏提示
    await wrapper.find('.hint').trigger('click');
    expect(wrapper.vm.isHintVisible).toBe(false);
  }); 
});
