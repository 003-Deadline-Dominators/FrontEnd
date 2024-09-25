import { shallowMount } from '@vue/test-utils';
import App from '@/components/App.vue';
import Header from '@/components/Question/Header.vue';
import ProblemSection from '@/components/Question/ProblemSection.vue';
import DragDrop from '@/components/Question/DragDrop.vue';
import Nava from '@/components/nav.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Mock router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: {} }], // Mock route
});

describe('App.vue', () => {
  let wrapper;
  let dragDropMock;

  beforeEach(() => {
    // Create mock methods for DragDrop
    dragDropMock = {
      submit: jest.fn(),
      resetBlocks: jest.fn(),
      rebuild: jest.fn(),
    };

    // Set up shallowMount with mocked DragDrop component and router
    wrapper = shallowMount(App, {
      global: {
        plugins: [router], // Inject the router
        stubs: {
          DragDrop: {
            template: '<div></div>',
            methods: dragDropMock, // Mocked methods for DragDrop
          },
        },
      },
      data() {
        return {
          showloading: false, // Ensure loading logic is bypassed for testing
        };
      },
    });
  });

  // Test if the components render correctly
  it('renders the correct components', () => {
    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(ProblemSection).exists()).toBe(true);
    expect(wrapper.findComponent(Nava).exists()).toBe(true);
  });

  // Test if the DragDrop submit method is called when triggered
  it('calls DragDrop submit method when submit is triggered', () => {
    const submitSpy = jest.spyOn(wrapper.vm.$refs.dragDrop, 'submit');
    wrapper.vm.submit();
    expect(submitSpy).toHaveBeenCalled(); // Ensure DragDrop's submit method is called
  });

  // Test if the DragDrop resetBlocks method is called when triggered
  it('calls DragDrop resetBlocks method when resetBlocks is triggered', () => {
    const resetSpy = jest.spyOn(wrapper.vm.$refs.dragDrop, 'resetBlocks');
    wrapper.vm.resetBlocks();
    expect(resetSpy).toHaveBeenCalled(); // Ensure DragDrop's resetBlocks method is called
  });

  // Test if the DragDrop rebuild method is called when triggered
  it('calls DragDrop rebuild method when rebuild is triggered', () => {
    const rebuildSpy = jest.spyOn(wrapper.vm.$refs.dragDrop, 'rebuild');
    wrapper.vm.rebuild();
    expect(rebuildSpy).toHaveBeenCalled(); // Ensure DragDrop's rebuild method is called
  });

  // Test if the problem section toggles its state when the toggleProblemSection method is triggered
  it('toggles problem section when toggleProblemSection is triggered', async () => {
    const initialCollapsedState = wrapper.vm.isProblemCollapsed;
    wrapper.vm.toggleProblemSection();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isProblemCollapsed).toBe(!initialCollapsedState); // Ensure problem section toggles
  });
});
