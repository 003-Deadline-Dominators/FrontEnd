<template>
  <div class="problem-section">
    <div class="problem">
      <h3 class="scenario">Scenario</h3>
      <p>{{ scenario }}</p>
      <h3 class="task">Task</h3>
      <p>{{ task }}</p>
      <div class="hint">
        <h3>Hint</h3>
        <p>Learn Angular js to build a beautiful landing page for your business...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProblemSection',
  data() {
    return {
      scenario: '',
      task: ''
    }
  },

  mounted() {
    axios
        .get('http://localhost:8080/problem')
        .then(response => {
          console.log(response.data); // Check the structure here
          this.scenario = response.data.scenario; // Correct access to 'scenario'
          this.task = response.data.task; // Correct access to 'task'
        })
        .catch(error => {
          console.log(error);
        });
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
  width: 50%;
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
}
h3{
  color: #ea7e31;

}
</style>
