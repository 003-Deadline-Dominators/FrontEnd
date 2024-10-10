<template>
  <div class="problem-section">
    <div class="problem">
      <h3 class="scenario">Scenario</h3>
      <img :src="scenarioSVG" alt="scenario" class="scenario-svg"/>
      <p>{{ scenario }}</p>

      <h3 class="task">Task</h3>
      <p>{{ task }}</p>

      <div @click="toggleHintVisibility" class="hint">
        <h3>Hint (Click to review)</h3>
        <p v-if="isHintVisible" v-for="(item, index) in hint" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import scenarioSVG from '@/assets/Topic/Context/Question/scenario.svg';

export default {
  name: 'ProblemSection',
  data() {
    return {
      scenarioSVG,
      scenario: '',
      task: '',
      hasFetchedData: false, // Flag to check if data has been fetched
      hint: '',
      isHintVisible: false // Toggle visibility of hint
    };
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
          .get('http://localhost:8080/problem', {
            params: { variable1: topicTitle, variable2: contextTitle },
          })
          .then((response) => {
            console.log(response.data); // Check the structure here
            this.scenario = response.data.scenario;
            this.task = response.data.task;
            this.$emit('problem-section-loaded');
            this.hasFetchedData = true; // Set the flag to true after data is fetched

            axios
                .get('http://localhost:8080/hint', {})
                .then((response) => {
                  console.log(response.data); // Check the structure here
                  this.hint = response.data.hints;
                  this.$emit('hint-loaded');
                });
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
.scenario {
  background-color: #ece7fb;
  padding: 15px;
  border-radius: 5px;
  color: #8363e2;
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
  padding: 15px;
  border-radius: 5px;
  color: #8363e2;
}

.hint {
  background-color: #f9eee2;
  padding: 15px;
  border-radius: 5px;
  color: #ea7e31;
  transition: transform 0.3s;
}

.hint:hover {
  cursor: pointer;
  transform: scale(1.02);
}
h3{
  color: #ea7e31;
}

.dataset {
  height: 200px;
  overflow-y: auto;
}
.scenario-svg{
  position: absolute;
  top: -20px;
  left: 320px;
  justify-content: center;
}
</style>
