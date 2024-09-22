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
          <DragDrop ref="dragDrop" @drag-drop-loaded="onDragDropLoaded"/>
<!--          <DragDropArea ref="dragDrop" @drag-drop-loaded="onDragDropLoaded" />-->
          <div v-if="showOverlay" class="overlay">
            <h1>Are you ready to Craft Code?</h1>
            <img :src="Overlay" alt="overlay" />
            <button @click="removeOverlay" class="overlay-button">Start</button>
          </div>
        </div>
      </div>
      <div v-if="showloading" class="loading">
        <loading />
      </div>
    </div>
  </div>
</template>



<script>
import Nava from './nav.vue';
import Header from './Question/Header.vue';
import ProblemSection from './Question/ProblemSection.vue';
import Overlay from '../assets/Topic/Context/Question/overlay.svg';
import loading from './Question/loading.vue';
import DragDrop from './Question/DragDrop.vue';

export default {
  components: {
    Nava,
    Header,
    ProblemSection,
    DragDrop,
    loading,
  },
  data() {
    return {
      Overlay,
      showOverlay: true,
      isProblemCollapsed: false,
      startTime: null,
      showloading: true,
      dragDropLoaded: true, // Flag for DragDropArea load completion
      problemSectionLoaded: false,
    };
  },
  methods: {
    submit() {
      /**
     * Submits the data using the DragDrop component's submit method.
     */
      this.$refs.dragDrop.submit();
    },

    /**
     * Resets blocks using the DragDrop component's resetBlocks method.
     */
    resetBlocks() {
      this.$refs.dragDrop.resetBlocks();
    },

    /**
     * Rebuilds blocks using the DragDrop component's rebuild method.
     */
    rebuild() {
      this.$refs.dragDrop.rebuild();
    },

    /**
     * Removes the overlay, collapses the problem section, and records the start time.
     */
    removeOverlay() {
      this.showOverlay = false;
      this.isProblemCollapsed = true;
      this.startTime = new Date();
    },

    /**
     * Toggles the visibility of the problem section.
     */
    toggleProblemSection() {
      console.log('toggleProblemSection method called');
      this.isProblemCollapsed = !this.isProblemCollapsed;
    },

    /**
     * Handler for when the DragDrop component has loaded.
     * Sets dragDropLoaded to true and checks if loading can be stopped.
     */
    onDragDropLoaded() {
      this.dragDropLoaded = true;
      this.checkLoadingStatus();
    },

    /**
     * Handler for when the ProblemSection component has loaded.
     * Sets problemSectionLoaded to true and checks if loading can be stopped.
     */
    onProblemSectionLoaded() {
      this.problemSectionLoaded = true;
      this.checkLoadingStatus();
    },

    /**
     * Checks if both DragDrop and ProblemSection components have loaded.
     * If so, hides the loading indicator.
     */
    checkLoadingStatus() {
      if (this.dragDropLoaded && this.problemSectionLoaded) {
        this.showloading = false; // Hide loading once both requests are complete
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

</style>