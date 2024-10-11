<template>
  <div class="code-editor">
    <div class="sub-select">
      <button class="sub-button" v-for="btn in buttons" :key="btn.text" @click="handleButtonClick(btn.text) " :class="{ 'active-button': (btn.text === 'Feedback' && showFeedback) || (btn.text === 'Code' && showCode) }">
        <img :src="btn.src" alt="" />
        {{ btn.text }}
      </button>
      <div class = "button-right">
        <button class="run-button" @click="onSubmit">
          <img :src="runIcon" alt="Run"/>
          Run
        </button>
      <button class="sub-button-right" @click="toggleExpand">
        <img :src="expandIcon" alt="" />
      </button>
      </div>
    </div>
    <p v-if="showCode" :class="['code', { expanded: !collapsed }]" ref="codeContainer">
      <code v-for="(block, index) in problemData" :key="index"
            class ="code-line">
        {{ block }}
      </code>
      <code v-for="(block, index) in codeBlocks" :key="index"
            :style="{ marginLeft: block.position + 'px' }"
            class="code-line">
        {{ block.content }}
      </code>
    </p>
    <div v-if="loading" class="loading-text"></div>
    <div v-if="showFeedback" class="feedback-container">
      <pre v-if="loading">Loading feedback...</pre>
      <pre v-if="feedbackData.stdout">
        <h3>Standard Output:</h3>
        {{ feedbackData.stdout }}
      </pre>
      <pre v-if="feedbackData.stderr">
        <h3>Standard Error:</h3>
        {{ feedbackData.stderr }}
      </pre>
    </div>
  </div>
</template>

<script>
import feedbackIcon from '@/assets/Topic/Context/Question/feedback.svg';
import codeIcon from '@/assets/Topic/Context/Question/code.svg';
import expandIcon from '@/assets/Topic/Context/Question/expand.svg';
import runIcon from '@/assets/Topic/Context/Question/run.svg'

export default {
  props: {
    problemData: {
      type: Object,  // or String, depending on the structure of the data
      required: true
    },
    codeBlocks: {
      type: Array,
      required: true,
    },
    feedbackData: {
      type: Object,
      default: () => ({}),
    },
    onSubmit: Function,
  },
  watch: {
    feedbackData: {
      handler(newData) {
        console.log('New feedbackData:', newData);
        this.loading = true; // Set loading to true when feedbackData changes
        if (newData && (newData.stdout || newData.stderr)) {
          this.showFeedback = true;
          this.showCode = false;
          this.loading = false; // Set loading to false after processing
        } else {
          this.loading = false; // Set loading to false if no feedback data
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      buttons: [
        { src: feedbackIcon, text: 'Feedback' },
        { src: codeIcon, text: 'Code' },
      ],
      runIcon,
      expandIcon,
      collapsed: true,
      showCode: true,
      showFeedback: false,
      loading: false, // Loading state
    };
  },
  methods: {
    toggleExpand() {
      this.collapsed = !this.collapsed;
    },
    handleButtonClick(buttonText) {
      if (buttonText === 'Feedback') {
        this.showFeedback = true;
        this.showCode = false;
      } else if (buttonText === 'Code') {
        this.showFeedback = false;
        this.showCode = true;
      }
    },
  },
};
</script>

<style scoped>
.code-editor {
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.feedback-container {
  padding: 10px;
  margin-left: 10px;
}

.sub-select {
  display: flex;
  flex-direction: row;
  padding: 5px;
  background-color: #30313d;
}

.sub-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 15px;
  transition: transform 0.5s ease;
}
.active-button {
  border-bottom: 2px solid #79e538; /* Active button style */
}
.sub-button:hover {
  border-bottom: 2px solid #79e538;
  transform: scale(1.08);
}

.sub-button img {
  margin-right: 5px;
}

.sub-button-right {
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.5s;
  margin-right: 10px;
}

.run-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #A4D48D;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.5s ease;
  margin-right: 30px;
}

.button-right{
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-left: auto;

}

.run-button:hover {
  border-bottom: 2px solid #79e538;
  transform: scale(1.08);
}

.sub-button-right:hover {
  transform: scale(1.3);
}

.code {
  padding: 30px;
  margin: 0;
  white-space: pre;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  overflow-y: auto;
  height: 0;
  transition: height 0.3s ease;
}


.code.expanded {
  height: auto; /* Expands to fit content */
}

.code-line {
  display: flex;
  padding: 0 0;
  margin: 2px;
}


.loading-text {
  color: #ffffff;
  padding: 10px;
  text-align: center;
}
</style>
