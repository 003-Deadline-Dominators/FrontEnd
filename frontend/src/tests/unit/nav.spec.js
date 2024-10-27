import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/nav.vue';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

describe('Nav.vue', () => {
  let store;
  let getters;
  let actions;
  let router;

  beforeEach(() => {
    actions = {
      toggleDashboard: jest.fn(),
      updateIcon: jest.fn(),
    };

    getters = {
      showDashboard: () => true,
      currentIcon: () => 'user.svg',
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });

    // Mock router's push method globally
    router.push = jest.fn();
  });

  it('renders the correct buttons based on props', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router],
      },
      props: {
        showModule: true,
        showContext: true,
        showSelected: true,
      },
    });

    expect(wrapper.find('#start').exists()).toBe(true);
    expect(wrapper.find('#context').exists()).toBe(true);
    expect(wrapper.find('#selected').exists()).toBe(true);
  });

  it('hides buttons when props are false', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router],
      },
      props: {
        showModule: false,
        showContext: false,
        showSelected: false,
      },
    });

    expect(wrapper.find('#start').exists()).toBe(false);
    expect(wrapper.find('#context').exists()).toBe(false);
    expect(wrapper.find('#selected').exists()).toBe(false);
  });

  it('navigates to /topic when "Module" button is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.find('#start').trigger('click');
    expect(router.push).toHaveBeenCalledWith('/topic');
  });

  it('shows input field when currentIcon is clicked', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.find('.clickable-image').trigger('click');
    expect(wrapper.vm.showInput).toBe(true);
  });

  it('handles correct passcode and triggers Vuex actions', async () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [store, router],
      },
    });

    // Click the icon to show the input field
    await wrapper.find('.clickable-image').trigger('click');

    // Set the correct input value
    await wrapper.setData({ inputValue: 'passcode' });

    // Simulate user pressing the Enter key to trigger validation
    await wrapper.find('input').trigger('keyup.enter');

    // Verify that Vuex actions are correctly called
    expect(actions.toggleDashboard).toHaveBeenCalled();
    expect(actions.updateIcon).toHaveBeenCalled();

    // Verify if it navigates to /dashboard
    expect(router.push).toHaveBeenCalledWith('/dashboard');
  });
});
