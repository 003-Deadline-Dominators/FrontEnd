import { shallowMount } from '@vue/test-utils';
import DragDrop from '@/components/question/DragDrop.vue';
import axios from 'axios';

jest.mock('axios');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

// Set the localStorage mock to window object
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('DragDrop.vue', () => {
  let wrapper;

  // Run this function before each test
  beforeEach(() => {
    // Clear the mock localStorage
    localStorage.clear();
    
    // Mock Axios GET and POST responses
    axios.get.mockResolvedValue({ data: { code: ['function example() {}'] } });
    axios.post.mockResolvedValue({ data: { stdout: 'Output', stderr: '' } });

    // Mount the DragDrop component using shallowMount for testing
    wrapper = shallowMount(DragDrop, {
      props: {
        problemData: { sample: 'data' }, // Pass props for the test
        showOverlay: false,
        problemSectionLoaded: true,
      },
      global: {
        stubs: ['VueDraggable'], // Use a stub to replace the VueDraggable component
      },
    });
  });

  // Test if VueDraggable component is rendered correctly
  it('renders VueDraggable components', () => {
    // Expect that VueDraggable exists in the component
    expect(wrapper.findComponent({ name: 'VueDraggable' }).exists()).toBe(true);
  });

  // Test if data is fetched when problem section is loaded
  it('fetches code data when problem section is loaded', async () => {
    // Call fetchCodeData method
    await wrapper.vm.fetchCodeData();

    // Expect Axios to have called the GET request to the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/code');
    // Check if the list1 has items fetched from the API
    expect(wrapper.vm.list1.length).toBeGreaterThan(0);
  });

  // Test if submit method works correctly
  it('calls submit and emits the correct event', async () => {
    // Call submit method
    await wrapper.vm.submit();

    // Expect Axios to have called the POST request with proper URL and form data
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/submit',
      expect.any(FormData),
      { headers: { 'Content-Type': 'application/json' } }
    );
    // Check if the 'submitted-data' event is emitted
    expect(wrapper.emitted('submitted-data')).toBeTruthy();
  });

  // Test if resetBlocks method moves items back to list1
  it('resets blocks correctly when resetBlocks is called', () => {
    // Set initial data for the test
    wrapper.setData({
      list1: [], // Initially, list1 is empty
      list2: [{ id: 1, content: 'Example Item', position: 0 }], // list2 has one item
    });

    // Call resetBlocks method
    wrapper.vm.resetBlocks();

    // Expect that list1 now contains the item from list2
    expect(wrapper.vm.list1.length).toBe(1);
    // Expect list2 to be empty after the reset
    expect(wrapper.vm.list2.length).toBe(0);
  });

  // Test if cyclePosition changes the item's position correctly
  it('changes item position when cyclePosition is called', () => {
    const item = { id: 1, content: 'Example Item', position: 0 };
    // Call cyclePosition method with the item
    wrapper.vm.cyclePosition(item);
    // Check if the item's position has changed
    expect(item.position).toBe(1);
  });

  // Test if the tooltip is displayed correctly
  it('shows tooltip when conditions are met', () => {
    // Set data required for the tooltip to show
    wrapper.setData({
      list2: [{ id: 1, content: 'Example Item', position: 0 }],
      tooltipShown: false, // Initially, tooltip is not shown
    });

    // Expect the computed property 'shouldShowTooltip' to return true
    expect(wrapper.vm.shouldShowTooltip).toBe(true);
  });
});
