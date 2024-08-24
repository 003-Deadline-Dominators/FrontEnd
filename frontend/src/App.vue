<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="content-wrapper">
        <ProblemSection />
        <div class = "container">
          <DragDropArea />
          <CodeEditor />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import ProblemSection from './components/ProblemSection.vue';
import DragDropArea from './components/DragDropArea.vue';
import CodeEditor from './components/CodeEditor.vue';

export default {
  components: {
    Sidebar,
    Header,
    ProblemSection,
    DragDropArea,
    CodeEditor,
  },
};
</script>

<style>
#app {
  display: flex;
}
</style>
