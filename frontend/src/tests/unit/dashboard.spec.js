import { shallowMount } from '@vue/test-utils';
import LineChart from '@/components/LineChart.vue';
import Nava from '@/components/nav.vue';
import { ElTable, ElPagination } from 'element-plus';
import axios from 'axios';
import * as echarts from 'echarts';

// Mock Axios
jest.mock('axios');

// Mock ECharts initialization
jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe('LineChart.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Create a shallow mount of the component
    wrapper = shallowMount(LineChart, {
      global: {
        stubs: {
          Nava: true,
          ElTable: true,
          ElPagination: true,
        },
      },
      data() {
        return {
          topics: [
            { id: 1, topicTitle: 'Topic 1' },
            { id: 2, topicTitle: 'Topic 2' },
          ],
          tableData: [
            { ipAddress: '192.168.1.1', correctness: 'Correct', topicCategory: 'Math', contexts: 'Sample Context', generateTime: '2024-10-01T12:00:00', submitTime: '2024-10-01T12:05:00', duration: '00:05:00' },
            { ipAddress: '192.168.1.2', correctness: 'Incorrect', topicCategory: 'Science', contexts: 'Sample Context 2', generateTime: '2024-10-01T12:10:00', submitTime: '2024-10-01T12:15:00', duration: '00:05:00' },
          ],
          isChartVisible: true,
        };
      },
    });
  });

  it('renders the correct components', () => {
    // Check if the custom navigation component renders
    expect(wrapper.findComponent(Nava).exists()).toBe(true);

    // Check if the table and pagination components render
    expect(wrapper.findComponent(ElTable).exists()).toBe(true);
    expect(wrapper.findComponent(ElPagination).exists()).toBe(true);
  });

  it('toggles the chart visibility when expandTable is called', async () => {
    const initialVisibility = wrapper.vm.isChartVisible;

    // Trigger the expandTable method
    wrapper.vm.expandTable();
    await wrapper.vm.$nextTick();

    // Verify the chart visibility has toggled
    expect(wrapper.vm.isChartVisible).toBe(!initialVisibility);
  });

  it('fetches topics and table data on mount', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, topicTitle: 'Topic 1' }] });
    axios.get.mockResolvedValueOnce({
      data: [
        { ipAddress: '192.168.1.1', correctness: 'Correct' },
        { ipAddress: '192.168.1.2', correctness: 'Incorrect' },
      ],
    });

    // Remount the component to trigger the API calls
    wrapper = shallowMount(LineChart);

    // Wait for the promises to resolve
    await wrapper.vm.$nextTick();

    // Check if topics were fetched correctly
    expect(wrapper.vm.topics).toEqual([{ id: 1, topicTitle: 'Topic 1' }]);

    // Check if table data was fetched correctly
    expect(wrapper.vm.tableData).toEqual([
      { ipAddress: '192.168.1.1', correctness: 'Correct' },
      { ipAddress: '192.168.1.2', correctness: 'Incorrect' },
    ]);
  });

  it('updates chart data when filterCards is called', async () => {
    // Mock the fetchChartData and fetchChartDataFromTopic methods
    const fetchChartDataSpy = jest.spyOn(wrapper.vm, 'fetchChartData').mockResolvedValue();
    const fetchChartDataFromTopicSpy = jest.spyOn(wrapper.vm, 'fetchChartDataFromTopic').mockResolvedValue();

    // Set a selected topic and trigger filterCards
    wrapper.setData({ selectedTopic: 'Topic 1' });
    wrapper.vm.filterCards();

    // Check if fetchChartDataFromTopic was called
    expect(fetchChartDataFromTopicSpy).toHaveBeenCalled();

    // Reset the selected topic and trigger filterCards
    wrapper.setData({ selectedTopic: '' });
    wrapper.vm.filterCards();

    // Check if fetchChartData was called
    expect(fetchChartDataSpy).toHaveBeenCalled();
  });

  it('resizes chart on window resize', () => {
    // Mock the resize method
    const resizeSpy = jest.spyOn(wrapper.vm.myChart, 'resize');

    // Trigger the window resize event
    window.dispatchEvent(new Event('resize'));

    // Check if the resize method was called
    expect(resizeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
