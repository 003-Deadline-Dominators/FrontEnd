<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <Header
          :resetBlocks="resetBlocks"
          :mark="mark"
          :rebuild="rebuild"
      />
      <div class="content-wrapper">
        <ProblemSection />
        <div class="container">
          <DragDropArea ref="dragDrop" />
          <CodeEditor />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Question/Sidebar.vue';
import Header from './components/Question/Header.vue';
import ProblemSection from './components/Question/ProblemSection.vue';
import DragDropArea from './components/Question/DragDropArea.vue';
import CodeEditor from './components/Question/CodeEditor.vue';

export default {
  components: {
    Sidebar,
    Header,
    ProblemSection,
    DragDropArea,
    CodeEditor,
  },
  methods: {
    resetBlocks() {
      this.$refs.dragDrop.resetBlocks();
    },
    mark() {
      this.$refs.dragDrop.mark();
    },
    rebuild(){
      this.$refs.dragDrop.rebuild();
    },
  },
};
</script>

<style>
#app {
  display: flex;
}
</style>
