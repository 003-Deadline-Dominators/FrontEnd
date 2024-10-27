import { shallowMount } from '@vue/test-utils';
import Feedback from '@/components/Question/feedback.vue';

// Mocked methods for Retry and Next
const mockRetry = jest.fn();
const mockNext = jest.fn();

describe('Feedback.vue', () => {
  let wrapper;

  beforeEach(() => {
    // 使用 shallowMount 挂载组件
    wrapper = shallowMount(Feedback, {
      props: {
        takenTime: '5:00',
        attempts: 3,
        Retry: mockRetry,
        Next: mockNext,
      },
    });
  });

  // 测试组件是否正确渲染
  it('renders the correct components', () => {
    expect(wrapper.find('.feedback').exists()).toBe(true);
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.content-wrapper').exists()).toBe(true);
  });

  // 测试传递的 takenTime 和 attempts 属性是否正确显示
  it('displays the correct takenTime and attempts', () => {
    expect(wrapper.find('.Timer').text()).toBe('5:00');
    expect(wrapper.find('.attempts').text()).toBe('3');
  });

  // 测试 Retry 按钮是否调用了正确的函数
  it('calls Retry method when Retry button is clicked', async () => {
    await wrapper.find('.feedback-buttons button').trigger('click');
    expect(mockRetry).toHaveBeenCalled();
  });

  // 测试 Next 按钮是否调用了正确的函数
  it('calls Next method when Next button is clicked', async () => {
    const nextButton = wrapper.findAll('.feedback-buttons button').at(1);
    await nextButton.trigger('click');
    expect(mockNext).toHaveBeenCalled();
  });

   // 测试 Retry 按钮是否重置状态
   it('resets takenTime and attempts when Retry button is clicked', async () => {
    // 触发 Retry 按钮点击事件
    await wrapper.find('.feedback-buttons button').trigger('click');
    
    // 检查 takenTime 和 attempts 是否被重置
    expect(wrapper.vm.takenTime).toBe('0:00');
    expect(wrapper.vm.attempts).toBe(0);

    // 确保调用了 mockRetry 方法
    expect(mockRetry).toHaveBeenCalled();
  });
});
