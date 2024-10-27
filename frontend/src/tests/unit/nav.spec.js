import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/nav.vue';
import { createStore } from 'vuex';
import { createRouter, createMemoryHistory } from 'vue-router';

// 创建 Vuex Store mock
const toggleDashboardMock = jest.fn();
const updateIconMock = jest.fn();
const toggleShowInputGloballyMock = jest.fn();
const setIsLoggedInMock = jest.fn();

const mockStore = createStore({
  state: {
    isLoggedIn: false,
    showInputGlobally: true,
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    showInputGlobally: (state) => state.showInputGlobally,
  },
  actions: {
    toggleDashboard: (context, payload) => toggleDashboardMock(payload),
    updateIcon: (context, payload) => updateIconMock(payload),
    toggleShowInputGlobally: (context, payload) => toggleShowInputGloballyMock(payload),
    setIsLoggedIn: (context, payload) => setIsLoggedInMock(payload),
  },
  mutations: {
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
});

// 创建 Vue Router mock
const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home' },
    { path: '/Homepage/Topic', name: 'Topic' },
    { path: '/dashboard', name: 'dashboard' },
  ],
});

describe('Nav.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Nav, {
      global: {
        plugins: [mockStore, mockRouter],
      },
      props: {
        showModule: true,
        showContext: true,
        showSelected: true,
      },
    });
  });

  it('renders the correct buttons based on props', () => {
    const moduleButton = wrapper.find('button#start');
    expect(moduleButton.exists()).toBe(true);
    const contextButton = wrapper.find('button#context');
    expect(contextButton.exists()).toBe(true);
    const selectedButton = wrapper.find('button#selected');
    expect(selectedButton.exists()).toBe(true);
  });

  it('hides buttons when props are false', async () => {
    await wrapper.setProps({ showModule: false, showContext: false, showSelected: false });
    expect(wrapper.find('button#start').exists()).toBe(false);
    expect(wrapper.find('button#context').exists()).toBe(false);
    expect(wrapper.find('button#selected').exists()).toBe(false);
  });

  it('navigates to /Homepage/Topic when "Module" button is clicked', async () => {
    const moduleButton = wrapper.find('button#start');
    await moduleButton.trigger('click');
    await mockRouter.isReady(); // 等待路由准备就绪
    expect(mockRouter.currentRoute.value.path).toBe('/Homepage/Topic');
  });

  it('shows input field when currentIcon is clicked', async () => {
    const icon = wrapper.find('.clickable-image');
    await icon.trigger('click');
    await wrapper.vm.$nextTick(); // 等待 Vue 更新 DOM
    expect(wrapper.vm.showInput).toBe(true);
  });

  it('handles correct passcode and triggers Vuex actions', async () => {
    wrapper.setData({ inputValue: 'passcode' });
    await wrapper.vm.checkPasscode();
    expect(wrapper.vm.showInput).toBe(false);
    expect(toggleDashboardMock).toHaveBeenCalledWith(true); // 确认 action 被正确调用
  });
});
