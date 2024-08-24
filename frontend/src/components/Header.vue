<template>
  <div class="header">
    <div class="header-content">
      <h3 class="context">Learn Angular</h3>
      <div class="buttons">
        <button v-for="btn in buttons" :key="btn.text" class="image-button">
          <img :src="btn.src" width="25" height="25" />
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import submitImg from '@/assets/submit.svg';
import resetImg from '@/assets/resets.svg';
import rebuildImg from '@/assets/rebuild.svg';
import saveImg from '@/assets/save.svg';
import markImg from '@/assets/mark.svg';

export default {
  data() {
    return {
      buttons: [
        { src: submitImg, text: 'Submit' },
        { src: resetImg, text: 'Reset' },
        { src: rebuildImg, text: 'Rebuild' },
        { src: saveImg, text: 'Save' },
        { src: markImg, text: 'Mark' },
      ],
    };
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
