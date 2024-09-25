<template>
  <div id="app">
    <div class="main-content">
      <Nava :showDashboard="false" />
      <Header
          :submit="submit"
          :resetBlocks="resetBlocks"
          :rebuild="rebuild"
          :startTime="startTime"
          @toggle-problem="toggleProblemSection"
      />
      <div class="content-wrappers" :class="{ 'problem-collapsed': isProblemCollapsed }">
        <div class="problem-section-wrapper" :class="{ 'collapsed': isProblemCollapsed }">
          <ProblemSection v-show="!isProblemCollapsed" @problem-section-loaded="onProblemSectionLoaded" />
          <button v-show="isProblemCollapsed" @click="toggleProblemSection" class="expand-button"> >></button>
        </div>
        <div class="drag-drop-wrapper">
          <DragDrop ref="dragDrop" @drag-drop-loaded="onDragDropLoaded" @update:list2="updateList2" @submitted-data="handleSubmittedData" />
          <div v-if="showOverlay" class="overlay">
            <h1>Are you ready to Craft Code?</h1>
            <img :src="Overlay" alt="overlay" />
            <button @click="removeOverlay" class="overlay-button">Start</button>
          </div>
          <CodeEditor :codeBlocks="list2" :feedbackData="submittedData" ref="codeEditor"/>
        </div>
      </div>
      <div v-if="showloading" class="loading">
        <loading />
      </div>
    </div>
  </div>
</template>

<script>
import Nava from './components/nav.vue';
import Header from './components/Question/Header.vue';
import ProblemSection from './components/Question/ProblemSection.vue';
import Overlay from '@/assets/Topic/Context/Question/overlay.svg';
import loading from './components/Question/loading.vue';
import DragDrop from './components/Question/DragDrop.vue';
import CodeEditor from './components/Question/CodeEditor.vue';
import axios from 'axios';

export default {
  components: {
    Nava,
    Header,
    ProblemSection,
    DragDrop,
    loading,
    CodeEditor,
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
      list2: [],
      submittedData: {},
      isLoading: false, // Add loading state
      ipAddress: '',
      generateTime: null,
      submitTime: null,
    };
  },
  methods: {
    updateList2(newList2) {
      this.list2 = newList2.map(item => ({
        content: item.content,
        position: item.position * 20
      }));
      console.log("Updated list2:", this.list2);
    },
    handleSubmittedData(data) {
      this.submittedData = data;
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
    },
    resetBlocks() {
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
    checkLoadingStatus() {
      if (this.dragDropLoaded && this.problemSectionLoaded) {
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
  height: calc(100vh - 60px); /* Adjust based on your header height */
  position: relative;
}

.content-wrappers.problem-collapsed {
  gap: 0;
}

.problem-section-wrapper {
  flex: 0 0 500px;
  transition: flex 0.3s ease-in-out;
  margin-right: 10px;
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
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  color: #ff9500;
  transition: transform 0.5s ease;
}

.expand-button:hover {
  background-color: #ff9500;
  color: white;
  transform: translateY(-5px);
}

/* Constrain loading screen to content-wrappers */
.loading {
  position: absolute;
  top: 130px; /* Adjust based on header height */
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

</style>