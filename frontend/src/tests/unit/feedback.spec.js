import { shallowMount } from '@vue/test-utils';
import Feedback from '@/components/Question/feedback.vue';

// Mocked methods for Retry and Next
const mockRetry = jest.fn();
const mockNext = jest.fn();

describe('Feedback.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Use shallowMount to mount the component
    wrapper = shallowMount(Feedback, {
      props: {
        takenTime: '5:00',
        attempts: 3,
        Retry: mockRetry, // Pass the mocked Retry method
        Next: mockNext, // Pass the mocked Next method
      },
    });
  });

  // Test if the component renders correctly
  it('renders the correct components', () => {
    // Check if the feedback, title, and content-wrapper elements exist
    expect(wrapper.find('.feedback').exists()).toBe(true);
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.content-wrapper').exists()).toBe(true);
  });

  // Test if the passed props takenTime and attempts are displayed correctly
  it('displays the correct takenTime and attempts', () => {
    // Check if the Timer and attempts are displayed correctly
    expect(wrapper.find('.Timer').text()).toBe('5:00');
    expect(wrapper.find('.attempts').text()).toBe('3');
  });

  // Test if the Retry button calls the correct function
  it('calls Retry method when Retry button is clicked', async () => {
    // Simulate a click event on the first button and check if the Retry method was called
    await wrapper.find('.feedback-buttons button').trigger('click');
    expect(mockRetry).toHaveBeenCalled();
  });

  // Test if the Next button calls the correct function
  it('calls Next method when Next button is clicked', async () => {
    // Find the second button (Next button) and simulate a click event
    const nextButton = wrapper.findAll('.feedback-buttons button').at(1);
    await nextButton.trigger('click');
    // Check if the Next method was called
    expect(mockNext).toHaveBeenCalled();
  });

  // Test if the Retry button resets the takenTime and attempts
  it('resets takenTime and attempts when Retry button is clicked', async () => {
    // Trigger the click event on the Retry button
    await wrapper.find('.feedback-buttons button').trigger('click');
    
    // Check if takenTime and attempts were reset
    expect(wrapper.vm.takenTime).toBe('0:00');
    expect(wrapper.vm.attempts).toBe(0);

    // Ensure the mockRetry method was called
    expect(mockRetry).toHaveBeenCalled();
  });
});
