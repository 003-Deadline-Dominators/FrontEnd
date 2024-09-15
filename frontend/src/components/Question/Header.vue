<template>
  <div class="header-content">
    <h3 class="context">{{ formattedTitle }}</h3>
    <div class="timer" v-if="startTime">
      {{ formattedTime }}
      <button class="show-problem" @click="viewProblem">Show me problem</button>
    </div>
    <div class="buttons">
      <button v-for="(btn, index) in buttons" :key="btn.text" :class="`button-${index}`" class="image-button" @click="handleButtonClick(btn.text)">
        <img :src="btn.src" alt="image button">
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
    submit: Function,
    rebuild: Function,
    startTime: [Date, null],
  },
  data() {
    return {
      formattedTitle: this.$route.query.topicTitle + ' : ' + this.$route.query.contextTitle || '',
      buttons: [
        { src: submitImg, text: 'Submit' },
        { src: resetImg, text: 'Reset' },
        { src: rebuildImg, text: 'Rebuild' },
      ],
      currentTime: new Date(),
    };
  },
  computed: {
    formattedTime() {
      if (!this.startTime) return '00:00:00';
      const diff = Math.floor((this.currentTime - this.startTime) / 1000);
      const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      return `${hours} : ${minutes} : ${seconds}`;
    },
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
          this.submit();
          break;
        default:
          break;
      }
    },
    updateCurrentTime() {
      this.currentTime = new Date();
    },
    viewProblem() {
      console.log('viewProblem button clicked');
      this.$emit('toggle-problem');
    }
  },
  mounted() {
    if (this.startTime) {
      this.timerInterval = setInterval(this.updateCurrentTime, 1000);
    }
  },
  watch: {
    startTime(newValue) {
      if (newValue) {
        this.timerInterval = setInterval(this.updateCurrentTime, 1000);
      }
    },
  },
  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  padding: 0 20px;
}

.context {
  background-color: #e9e9e9;
  padding: 18px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: lighter;
  color: black;
}


.timer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 34px;
  border-radius: 5px;
}

.buttons {
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 5px;
  padding: 15px;
  width: 370px;
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

.show-problem {
  margin-left: 60px;
  cursor: pointer;
  background-color: #f6f6f6;
  font-size: 20px;
  width: auto;
  color: #FF9500;
  border-bottom: 2px solid #FF9500;
  transition: transform 0.3s ease;
}

.show-problem:hover {
  transform: translateY(-5px);
}

.image-button img {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.button-0 {
  margin-left: 0;
  margin-right: 62px;
}

.button-1 {
  margin-right: 62px;
}
</style>
