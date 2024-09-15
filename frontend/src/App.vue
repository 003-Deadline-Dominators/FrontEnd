<template>
  <div id="app">
    <div class="main-content">
      <Nava :showDashboard="false"/>
      <Header
          :submit="submit"
          :resetBlocks="resetBlocks"
          :rebuild="rebuild"
          :startTime="startTime"
          @toggle-problem="toggleProblemSection"
      />
      <div class="content-wrappers" :class="{ 'problem-collapsed': isProblemCollapsed }">
        <div class="problem-section-wrapper" :class="{ 'collapsed': isProblemCollapsed }">
          <!-- Use v-show instead of v-if to avoid destroying the component -->
          <ProblemSection v-show="!isProblemCollapsed" />
          <!-- Use v-show for the button to toggle between showing and hiding -->
          <button v-show="isProblemCollapsed" @click="toggleProblemSection" class="expand-button">
            >>
          </button>
        </div>
        <div class="drag-drop-wrapper">
          <DragDropArea ref="dragDrop" />
          <div v-if="showOverlay" class="overlay">
            <h1>Are you ready to Craft Code?</h1>
            <img :src="Overlay" alt="overlay">
            <button @click="removeOverlay" class="overlay-button">Start</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nava from './components/nav.vue';
import Header from './components/Question/Header.vue';
import ProblemSection from './components/Question/ProblemSection.vue';
import DragDropArea from './components/Question/DragDropArea.vue';
import Overlay from '@/assets/Topic/Context/Question/overlay.svg';

export default {
  components: {
    Nava,
    Header,
    ProblemSection,
    DragDropArea,
  },
  data() {
    return {
      Overlay,
      showOverlay: true,
      isProblemCollapsed: false,
      startTime: null,
    };
  },
  methods: {
    submit() {
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
      console.log('toggleProblemSection method called');
      this.isProblemCollapsed = !this.isProblemCollapsed;
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
  height: 100%;
  border-radius: 5px;
}

.content-wrappers {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: #f6f6f6;
  flex-direction: row;
  height: calc(100vh - 60px); /* Adjust based on your header height */
}
.content-wrappers.problem-collapsed {
  gap: 0;
}

.problem-section-wrapper {
  flex: 1;
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
  background-color: rgba(197,204,195, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.overlay img{
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
  background-color: #79E538;
  opacity: 80%;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.overlay-button:hover {
  background-color: #45a049;
}

.expand-button{
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  color: #FF9500;
  transition: transform 0.5s ease;
}

.expand-button:hover {
  background-color: #FF9500;
  color: white;
  transform: translateY(-5px);
}
</style>