<template>
  <div class="problem-section">
    <div class="problem">
      <h3 class="task">Task</h3>
      <p>Learn Angular js to build a beautiful landing page for your business...</p>
    </div>
    <div class="hint">
      <h3>Hint</h3>
      <p>Learn Angular js to build a beautiful landing page for your business...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemSection',
};
</script>

<style scoped>
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
  margin: 20px;
}
</style>
