import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/nav.vue';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router'; // 使用Vue 3的方式创建路由

describe('Nav.vue', () => {
  let store;
  let getters;
  let actions;
  let router;

  beforeEach(() => {
    actions = {
      toggleDashboard: jest.fn(),
      updateIcon: jest.fn()
    };

    getters = {
      showDashboard: () => true,
      currentIcon: () => 'user.svg',
    };

    store = new Vuex.Store({
      getters,
      actions
    });

    router = createRouter({
      history: createWebHistory(),  // 使用 Vue 3 路由历史模式
      routes: [] // 在测试中可以不定义具体路由
    });
  });

  it('renders the correct buttons based on props', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router] // 注入 Vuex 和 Vue Router
      },
      props: {
        showModule: true,
        showContext: true,
        showSelected: true
      }
    });

    expect(wrapper.find('#start').exists()).toBe(true); // 检查 "Module" 按钮
    expect(wrapper.find('#context').exists()).toBe(true); // 检查 "Context" 按钮
    expect(wrapper.find('#selected').exists()).toBe(true); // 检查 "Question" 按钮
  });

  it('hides buttons when props are false', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      },
      props: {
        showModule: false,
        showContext: false,
        showSelected: false
      }
    });

    expect(wrapper.find('#start').exists()).toBe(false); // "Module" 按钮隐藏
    expect(wrapper.find('#context').exists()).toBe(false); // "Context" 按钮隐藏
    expect(wrapper.find('#selected').exists()).toBe(false);// "Question" 按钮隐藏
  });

  it('navigates to /topic when "Module" button is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });

    wrapper.vm.$router.push = jest.fn(); // 模拟路由的 `push` 方法

    await wrapper.find('#start').trigger('click'); // 点击 "Module" 按钮
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/topic'); // 检查是否导航到 /topic
  });

  it('shows input field when currentIcon is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.find('.clickable-image').trigger('click'); // 点击图标
    expect(wrapper.vm.showInput).toBe(true); // 检查输入框是否显示
  });

  it('handles correct passcode and triggers Vuex actions', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });
  
    // 首先点击图标显示输入框
    await wrapper.find('.clickable-image').trigger('click');
  
    // 设置正确的输入值
    wrapper.setData({ inputValue: 'passcode' });
  
    // 模拟 $router.push
    wrapper.vm.$router.push = jest.fn();
  
    // 模拟用户按下回车键触发验证
    await wrapper.find('input').trigger('keyup.enter');
  
    // 验证 Vuex 动作是否被正确调用
    expect(actions.toggleDashboard).toHaveBeenCalled();
    expect(actions.updateIcon).toHaveBeenCalled();
  
    // 验证是否导航到 /dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });
  
});
