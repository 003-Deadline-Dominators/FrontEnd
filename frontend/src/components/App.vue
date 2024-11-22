<template>
  <div id="app">
    <div class="main-content">
      <Nava :showDashboard="false" />
      <Header
          :submit="preview"
          :resetBlocks="resetBlocks"
          :rebuild="rebuild"
          :startTime="startTime"
          @toggle-problem="toggleProblemSection"
      />
      <div class="content-wrappers" :class="{ 'problem-collapsed': isProblemCollapsed }">

        <div class="problem-section-wrapper" :class="{ 'collapsed': isProblemCollapsed }">
          <ProblemSection v-show="!isProblemCollapsed" :dragDropLoaded="dragDropLoaded" @problem-section-loaded="onProblemSectionLoaded" @hint-loaded="onHintLoaded" />
          <button v-show="isProblemCollapsed" @click="toggleProblemSection" class="expand-button"> >></button>
        </div>
        <div class="drag-drop-wrapper" >
          <!-- Pass showOverlay prop -->
          <DragDrop class="drag-drop" ref="dragDrop" :showOverlay="showOverlay" :problemSectionLoaded="problemSectionLoaded" @drag-drop-loaded="onDragDropLoaded" @update:list2="updateList2" @submitted-data="handleSubmittedData" @data-define="handleDataDefine" :problem-data="problemData"/>
          <div v-if="showOverlay" class="overlay">
            <h1>Are you ready to Craft Code?</h1>
            <img :src="Overlay" alt="overlay" />
            <button @click="removeOverlay" class="overlay-button">Start</button>
          </div>
          <CodeEditor :codeBlocks="list2" :feedbackData="submittedData" :problem-data="problemData" ref="codeEditor" :onSubmit="submit"/>
        </div>
      </div>
      <div v-if="showloading" class="loading">
        <loading />
      </div>
    </div>
    <div v-if="showFeedbackOverlay" class="feedback-overlay">
      <feedBack :takenTime="duration" :attempts="attempts" :Retry="removeFeedbackOverlay" :Next="rebuild"/>
    </div>
  </div>
</template>

<script>
import Nava from './nav.vue'
import Header from './question/Header.vue';
import ProblemSection from './question/ProblemSection.vue';
import feedBack from './question/feedback.vue';
import Overlay from '@/assets/Topic/Context/Question/overlay.svg';
import loading from './question/loading.vue';
import DragDrop from './question/DragDrop.vue';
import CodeEditor from './question/CodeEditor.vue';
import axios from 'axios';
import {ElAlert} from 'element-plus'

export default {
    components: {
      Nava,
      Header,
      ProblemSection,
      DragDrop,
      loading,
      CodeEditor,
      feedBack,
      ElAlert,
    },
    data() {
      return {
        Overlay,
        showOverlay: true,
        isProblemCollapsed: false,
        startTime: null,
        showloading: true,
        dragDropLoaded: false,
        problemSectionLoaded: false,
        hintLoaded: false,
        list2: [],
        submittedData: {},
        isLoading: false, // Add loading state
        ipAddress: '',
        generateTime: null,
        submitTime: null,
        problemData: null,
        isExpanded: false,
        showFeedbackOverlay: false,
        attempts: 0,
        duration: 'no attempts yet'
      };
    },
    methods: {
      preview() {
        const submitTime1= new Date();
        this.submitTime = new Date(
            submitTime1.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
        );
        if(this.startTime !== null) {
          const duration = this.submitTime - this.startTime;
          this.duration = this.formatDuration(duration);
        }
        this.showFeedbackOverlay = true;
      },
      removeFeedbackOverlay() {
        this.showFeedbackOverlay = false;
        this.resetBlocks();
      },
      handleDataDefine(data) {
        this.problemData = data; // Update the problemData when emitted
      },
      updateList2(newList2) {
        this.list2 = newList2.map(item => ({
          content: item.content,
          position: item.position * 20
        }));
        console.log("Updated list2:", this.list2);
      },
      handleSubmittedData(data) {
        this.submittedData = data;
        this.attempts++;
        console.log('Submitted data in App:', data);

        const submitTime1= new Date();

        // Convert to Australia/Sydney time (adjust for your region if needed)
        this.submitTime = new Date(
            submitTime1.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
        );

        const durationInMillis = this.submitTime - this.startTime;

        // Convert the duration to hh:mm:ss format
        const duration = this.formatDuration(durationInMillis);
        const submissionData = {
          ipAddress: this.ipAddress,
          correctness: data.stdout ? 1 : 0,
          topicCategory: this.$route.query.topicTitle,
          duration: duration,
          contexts: this.$route.query.contextTitle,
          submitTime: this.submitTime, // Use Australian time
          generateTime: this.generateTime
        };

        this.sendDataToBackend(submissionData);
      },


  // New method to format duration as hh:mm:ss
      formatDuration(durationInMillis) {
        const totalSeconds = Math.floor(durationInMillis / 1000); // Convert milliseconds to seconds
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
      },

      formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      },

      sendDataToBackend(data) {
        axios.post('http://localhost:8080/admin/insertData', data)
            .then(response => {
              console.log('Data sent to backend:', response.data);
            })
            .catch(error => {
              console.error('Error sending data to backend:', error);
            });
      },
      submit(){
        this.$refs.dragDrop.submit();
        this.showFeedback = true;
      },
      resetBlocks() {
        this.attempts = 0;
        this.duration = 'no attempts yet';
        this.startTime = new Date();
        this.$refs.dragDrop.resetBlocks();
      },
      rebuild() {
        this.$refs.dragDrop.rebuild();
      },
      removeOverlay() {
        this.showOverlay = false;
        this.isProblemCollapsed = true;
        this.startTime = new Date();
      },
      toggleProblemSection() {
        this.isProblemCollapsed = !this.isProblemCollapsed;
      },
      onDragDropLoaded() {
        this.dragDropLoaded = true;
        this.checkLoadingStatus();
      },
      onProblemSectionLoaded() {
        this.problemSectionLoaded = true;
        this.checkLoadingStatus();
      },
      onHintLoaded() {
        this.hintLoaded = true;
        this.checkLoadingStatus();
      },
      checkLoadingStatus() {
        if (this.dragDropLoaded && this.problemSectionLoaded && this.hintLoaded) {
          this.showloading = false;
        }
      },
    },
    mounted() {
      const now = new Date();
      this.generateTime = new Date(
          now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
      );

      // Fetch IP address
      axios.get('https://api.ipify.org?format=json')
          .then(response => {
            this.ipAddress = response.data.ip;
          })
          .catch(error => {
            console.error('Error fetching IP address:', error);
          });
    }
  };
  </script>

  <style>
  body {
    margin: 0;
    background-color: #f6f6f6;
  }

  .main-content {
    background-color: #f6f6f6;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content-wrappers {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: #f6f6f6;
    flex-direction: row;
    height: calc(100vh - 60px);
    position: relative;
    overflow-y: auto;
  }

  .content-wrappers.problem-collapsed {
    gap: 0;
  }

  .problem-section-wrapper {
    position: sticky;
    top: 0;
    height: 100%;
    display: flex;
    align-items: stretch;
    flex: 0 0 500px;
    transition: flex 0.3s ease-in-out;
    margin-right: 10px;
    border-radius: 0 5px 5px 0;
  }



  .problem-section-wrapper.collapsed {
    flex: 0 0 50px;
    overflow: hidden;
  }

  .drag-drop-wrapper {
    position: relative;
    flex-grow: 1;
    width: 60%;
    height: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: rgba(197, 204, 195, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 5px;
  }

  .overlay img {
    width: auto;
    height: 70%;
    opacity: 90%;
  }

  .overlay h1 {
    font-size: 30px;
  }

  .overlay-button {
    padding: 10px;
    font-size: 30px;
    background-color: #79e538;
    opacity: 80%;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .overlay-button:hover {
    background-color: #45a049;
  }

  .expand-button {
    width: 100%;
    background-color: white;
    border-radius: 0 5px 5px 0;
    font-size: 24px;
    cursor: pointer;
    border: none;
    margin-right: 10px;
    color: #ff9500;
    transition: transform 0.5s ease;
    height: 100%;
  }

  .expand-button:hover {
    background-color: #ff9500;
    color: white;
    transform: translateY(-5px);
  }

  /* Constrain loading screen to content-wrappers */
  .loading {
    position: absolute;
    top: 100px; /* Adjust based on header height */
    left: 0;
    width: 100%;
    height: calc(100% - 60px); /* Adjust based on header height */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: #F6F6F6;
  }

  code-editor {
    border-radius: 5px;
  }

  .feedback-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's on top */
  }


  </style>

<style>
html{
  background-color: #f6f6f6;
}
</style>