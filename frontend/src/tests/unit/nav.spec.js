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
      history: createWebHistory(),  // Use Vue 3's history mode for the router
      routes: [] // No need to specify routes in tests
    });
  });

  // Test if the correct buttons render based on props
  it('renders the correct buttons based on props', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router] // Inject Vuex and Vue Router
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

  // Test if buttons are hidden when props are false
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

  // Test navigation to /topic when the "Module" button is clicked
  it('navigates to /topic when "Module" button is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });

    wrapper.vm.$router.push = jest.fn(); // Mock the router's `push` method

    await wrapper.find('#start').trigger('click'); // Click the "Module" button
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/topic'); // Check if it navigates to /topic
  });
  });

  // Test if the input field is shown when the current icon is clicked
  it('shows input field when currentIcon is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.find('.clickable-image').trigger('click'); // Click the icon
    expect(wrapper.vm.showInput).toBe(true); // Check if the input field is shown 
  });

  // Test handling of correct passcode and triggering Vuex actions
  it('handles correct passcode and triggers Vuex actions', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router]
      }
    });
  
    // click the icon to show the input field
    await wrapper.find('.clickable-image').trigger('click');
  
    // Set the correct input value
    wrapper.setData({ inputValue: 'passcode' });
  
    // Mock the $router.push method
    wrapper.vm.$router.push = jest.fn();
  
    // Simulate user pressing the Enter key to trigger validation
    await wrapper.find('input').trigger('keyup.enter');
  
    // Verify that Vuex actions are correctly called
    expect(actions.toggleDashboard).toHaveBeenCalled();
    expect(actions.toggleDashboard).toHaveBeenCalled();
    expect(actions.updateIcon).toHaveBeenCalled();
  
    // Verify if it navigates to /dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });
  
});
