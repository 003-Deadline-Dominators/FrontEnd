<template>
  <div id="app">
    <div class="main-content">
      <Nava :showDashboard="false"/>
      <Header
          :resetBlocks="resetBlocks"
          :submit="mark"
          :rebuild="rebuild"
      />
      <div class="content-wrappers">
        <ProblemSection />
        <DragDropArea ref="dragDrop" />
      </div>
      </div>
    </div>
</template>

<script>
import Nava from './components/nav.vue';
import Header from './components/Question/Header.vue';
import ProblemSection from './components/Question/ProblemSection.vue';
import DragDropArea from './components/Question/DragDropArea.vue';
import CodeEditor from './components/Question/CodeEditor.vue';

export default {
  components: {
    Nava,
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
body{
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
  height: 100%;
}

</style>

