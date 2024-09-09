<template>
  <div class="header">
    <div class="header-content">
      <h3 class="context">Linear Regression: WoolWorth</h3>
      <div class="buttons">
        <button v-for="btn in buttons" :key="btn.text" class="image-button" @click="handleButtonClick(btn.text)">
          <img :src="btn.src" width="25" height="25" />
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import submitImg from '@/assets/Topic/Context/Question/submit.svg';
import resetImg from '@/assets/Topic/Context/Question/resets.svg';
import rebuildImg from '@/assets/Topic/Context/Question/rebuild.svg';
import markImg from '@/assets/Topic/Context/Question/mark.svg';

export default {
  props: {
    resetBlocks: Function,
    mark: Function,
    rebuild: Function,
  },
  data() {
    return {
      buttons: [
        { src: submitImg, text: 'Submit' },
        { src: resetImg, text: 'Reset' },
        { src: rebuildImg, text: 'Rebuild' },
        { src: markImg, text: 'Mark' },
      ],
    };
  },
  methods: {
    handleButtonClick(action) {
      switch (action) {
        case 'Reset':
          this.resetBlocks();
          break;
        case 'Rebuild':
          this.rebuild();
          break;
        case 'Submit':
          break;
        case 'Mark':
          this.mark();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #eeeeee;
  padding: 10px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.image-button {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
}
</style>
