<template>
  <div class="problem-section">
    <div class="problem">
      <div class="scenario-title">
        <img :src="subIcon" alt="sub icon" class="sub-icon"/>
        <h3 class="scenario">Scenario</h3>
        </div>
      <img :src="scenarioSVG" alt="scenario" class="scenario-svg"/>
      <p>{{ scenario }}</p>
      <div class="task-title">
        <img :src="subIcon" alt="sub icon" class="sub-icon"/>
        <h3 class="task">Task</h3>
      </div>
        <p>{{ task }}</p>

      <div @click="toggleHintVisibility" class="hint">
        <div class = "hint-title">
        <img :src="hintIcon" alt="hintIcon" class="hint-Icon"/>
        <h3>
          <span class="hint-label">Hint: </span>
          <span class="hint-text">Click here to get the hint.</span>
        </h3>
        </div>
        <p v-if="isHintVisible" v-for="(item, index) in hint" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import scenarioSVG from '@/assets/Topic/Context/Question/scenario.svg';
import subIcon from '@/assets/Topic/Context/Question/subIcon.svg';
import hintIcon from '@/assets/Topic/Context/Question/hint.svg';

export default {
  name: 'ProblemSection',
  props: {
    dragDropLoaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scenarioSVG,
      subIcon,
      hintIcon,
      scenario: '',
      task: '',
      hasFetchedData: false, // Flag to check if data has been fetched
      hint: '',
      isHintVisible: false // Toggle visibility of hint
    };
  },
  watch: {
    // Watch the dragDropLoaded prop and trigger hint fetching when true
    dragDropLoaded(newValue) {
      if (newValue) {
        this.fetchHint();
      }
    },
  },
  mounted() {
    this.fetchProblemData();
  },

  methods: {
    fetchProblemData() {
      // Check if data has already been fetched to avoid redundant API calls
      if (this.hasFetchedData) return;

      const topicTitle = this.$route.query.topicTitle;
      const contextTitle = this.$route.query.contextTitle;
      console.log(topicTitle, contextTitle);

      axios
          .get('http://54.252.5.239:8080//problem', {
            params: { variable1: topicTitle, variable2: contextTitle },
          })
          .then((response) => {
            console.log(response.data); // Check the structure here
            this.scenario = response.data.scenario;
            this.task = response.data.task;
            this.$emit('problem-section-loaded');
            this.hasFetchedData = true; // Set the flag to true after data is fetched

          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetchHint() {
      axios
          .get('http://54.252.5.239:8080//hint')
          .then((response) => {
            console.log(response.data); // Check the structure here
            this.hint = response.data.hints;
            this.$emit('hint-loaded');
          })
          .catch((error) => {
            console.log(error);
          });
    },
    toggleHintVisibility() {
      this.isHintVisible = !this.isHintVisible;
    }
  }
};
</script>


<style scoped>
.scenario-title{
  display: flex;
  align-items: center;
  background-color: #ece7fb;
  padding-left: 15px;
  border-radius: 5px;
  height: 60px;
}

.scenario {
  background-color: #ece7fb;
  color: #8363e2;
}

.task-title{
  display: flex;
  align-items: center;
  background-color: #ece7fb;
  border-radius: 5px;
  padding-left: 15px;
  height: 60px;
}

.sub-icon{
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 28px;
  height: 28px;
}

p{
  padding-left: 4%;
  padding-right: 4%;
}

.problem-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
}

.problem {
  padding: 4%;
  border-radius: 5px;
  height: 100%;
  background-color: white;
}

.task {
  background-color: #ece7fb;
  color: #8363e2;
}

.hint-title{
  display: flex;
  align-items: center;
  background-color: #f9eee2;
  padding: 15px;
  border-radius: 5px;
  color: #ea7e31;
  transition: transform 0.3s;
}

.hint-Icon{
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 28px;
  height: 28px;
}

.hint {
  background-color: #f9eee2;
  border-radius: 5px;
  color: #ea7e31;
  transition: transform 0.3s;
  padding: 15px;
}

.hint:hover {
  cursor: pointer;
  transform: scale(1.02);
}

h3{
  color: #ea7e31;
}

.scenario-svg{
  position: absolute;
  top: -30px;
  left: 328px;
  justify-content: center;
  height: 120px;
}

.hint-text{
  color: #979797;
  font-weight: lighter;
  font-size: 16px;
}

</style>
