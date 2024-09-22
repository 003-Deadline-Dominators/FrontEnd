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