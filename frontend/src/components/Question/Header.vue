<template>
    <div class="header-content">
      <h3 class="context"> {{formattedTitle}}</h3>
      <div class="buttons">
        <button v-for="(btn, index) in buttons" :key="btn.text" :class="`button-${index}`" class="image-button" @click="handleButtonClick(btn.text)">
          <img :src="btn.src" alt = "image button">

          {{ btn.text }}
        </button>
      </div>
    </div>
</template>

<script>
import submitImg from '@/assets/Topic/Context/Question/submit.svg';
import resetImg from '@/assets/Topic/Context/Question/resets.svg';
import rebuildImg from '@/assets/Topic/Context/Question/rebuild.svg';

export default {
  props: {
    resetBlocks: Function,
    mark: Function,
    rebuild: Function,
  },
  data() {
    return {
      formattedTitle: this.$route.query.formattedTitle || '',
      buttons: [
        { src: submitImg, text: 'Submit' },
        { src: resetImg, text: 'Reset' },
        { src: rebuildImg, text: 'Rebuild' },

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
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
}

.context {
  margin-left: 20px;
  background-color: #e9e9e9;
  padding: 18px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: lighter;
  color: black;
}

.buttons {
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 5px;
  padding: 15px;
  margin-right: 30px;
  width: 380px;
  height: 27px;

}

.image-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
}

.image-button img {
  width: 25px;
  height: 25px;
  margin-right: 5px; /* Space between icon and text */
}

/* Custom spacing based on button index */
.button-0 {
  margin-left: 0;
  margin-right: 62px; /* Adjust spacing for the first button */
}

.button-1 {
  margin-right: 62px; /* Adjust spacing for the second button */
}

</style>
