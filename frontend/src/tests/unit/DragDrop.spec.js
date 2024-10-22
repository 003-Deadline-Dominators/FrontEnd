import { shallowMount } from '@vue/test-utils';
import DragDrop from '@/components/Question/DragDrop.vue';
import VueDraggable from 'vue-draggable-plus';
import axios from 'axios';

// Mock axios requests
jest.mock('axios');

describe('DragDrop.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DragDrop, {
      props: {
        problemData: { sample: 'data' },
        showOverlay: false,
        problemSectionLoaded: true,
      },
    });
  });

  // Test if the component renders correctly
  it('renders the VueDraggable components', () => {
    expect(wrapper.findComponent(VueDraggable).exists()).toBe(true);
  });

  // Test if data is fetched when problem section is loaded
  it('fetches code data when problem section is loaded', async () => {
    const mockData = {
      data: {
        code: ['function example() {}'],
      },
    };

    axios.get.mockResolvedValue(mockData);

    // Trigger the method manually
    await wrapper.vm.fetchCodeData();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/code');
    expect(wrapper.vm.list1.length).toBeGreaterThan(0);
  });

  // Test if the submit method works correctly
  it('calls submit and emits the correct event', async () => {
    axios.post.mockResolvedValue({
      data: {
        stdout: 'Output',
        stderr: '',
      },
    });

    await wrapper.vm.submit();

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/submit',
      expect.any(FormData),
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(wrapper.emitted('submitted-data')).toBeTruthy();
  });

  // Test if resetBlocks method moves items back to list1
  it('resets blocks correctly when resetBlocks is called', () => {
    wrapper.setData({
      list1: [],
      list2: [{ id: 1, content: 'Example Item', position: 0 }],
    });

    wrapper.vm.resetBlocks();

    expect(wrapper.vm.list1.length).toBe(1);
    expect(wrapper.vm.list2.length).toBe(0);
  });

  // Test if cyclePosition changes the item's position correctly
  it('changes item position when cyclePosition is called', () => {
    const item = { id: 1, content: 'Example Item', position: 0 };
    wrapper.vm.cyclePosition(item);
    expect(item.position).toBe(1);
  });

  // Test if the tooltip is displayed correctly
  it('shows tooltip when conditions are met', () => {
    wrapper.setData({
      list2: [{ id: 1, content: 'Example Item', position: 0 }],
      tooltipShown: false,
    });

    expect(wrapper.vm.shouldShowTooltip).toBe(true);
  });

  // Test if the tooltip logic is triggered correctly
  it('updates tooltipShown in localStorage', () => {
    wrapper.setData({ tooltipShown: false });
    wrapper.vm.checkTooltip();

    setTimeout(() => {
      expect(localStorage.getItem('tooltipShown')).toBe('true');
      expect(wrapper.vm.tooltipShown).toBe(true);
    }, 2000);
  });
});
