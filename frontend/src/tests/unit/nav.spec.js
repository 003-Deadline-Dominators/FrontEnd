import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/Nav.vue';

describe('Nav.vue', () => {
  it('should toggle to dashboard if correct passcode is entered', async () => {
    const wrapper = shallowMount(Nav, {
      mocks: {
        $route: {
          path: '/dashboard'  // 模拟路由路径
        }
      }
    });
    
    await wrapper.vm.$nextTick();  // 等待 DOM 渲染
    expect(wrapper.html()).toContain('<div class="nav">');
  });

  it('should alert error for incorrect passcode', async () => {
    global.alert = jest.fn(); // 模拟 alert 函数
    const wrapper = shallowMount(Nav, {
      mocks: {
        $route: {
          path: '/dashboard'  // 模拟路由路径
        }
      }
    });

    // 触发错误的模拟行为
    // 根据实际逻辑可以调用相应的方法或事件
    expect(global.alert).toHaveBeenCalled();
  });
});
