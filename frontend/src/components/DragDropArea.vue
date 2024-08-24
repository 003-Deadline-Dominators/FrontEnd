<template>
  <div class="answer">
    <div class="drag-zone">
      <h4 class="drag-title">Drag from here</h4>
      <div id="left">
        <div class="code-block" v-for="block in blocks" :key="block" draggable="true">{{ block }}</div>
      </div>
    </div>
    <div class="drop-zone">
      <h4 class="drop-title">Drop blocks here</h4>
      <div id="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: ['Code block 1', 'Code block 2', 'Code block 3', 'Code block 4'],
    };
  },
  mounted() {
    const colors = ['#007aff', '#06d6a0'];

    const codeBlocks = document.querySelectorAll('.code-block');

    // Apply a mixed color to each code-block
    codeBlocks.forEach((block, index) => {
      block.style.backgroundColor = colors[index % colors.length];
    });
    let left = document.getElementById('right');
    let right = document.getElementById('left');
    let lists = document.getElementsByClassName('code-block');

    for (let list of lists) {
      list.addEventListener('dragstart', function (e) {
        let selected = e.target;
        right.addEventListener('dragover', function (e) {
          e.preventDefault();
        });
        right.addEventListener('drop', function () {
          right.appendChild(selected);
          selected=null;
        });
        left.addEventListener('dragover', function (e) {
          e.preventDefault();
        });
        left.addEventListener('drop', function () {
          left.appendChild(selected);
          selected=null;
        });
      });
    }
  },
};
</script>

<style scoped>
.answer {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
}

.drag-zone, .drop-zone {
  margin: 20px;
}

.code-block {
  padding: 10px;
  margin: 5px;
  background-color: #1e1e1e;
  color: white;
  border-radius: 5px;
  cursor: grab;
}
</style>
