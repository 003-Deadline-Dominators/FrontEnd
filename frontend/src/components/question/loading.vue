<template>
  <div class="loading-container">
    <h1>Thinking of an interesting problem...</h1>
    <img :src="loading" alt="Loading animation">
    <span class="loading-text"></span><span class="loading-dots"></span>
  </div>

</template>

<script>

import loading from '@/assets/Topic/Context/Question/loading.svg';

export default {
  data() {
    return {
      loading,
    };
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.loading-text {
  margin-right: 5px;
}

.loading-dots::after {
  content: "..";
  animation: dots 1.5s steps(3, end) infinite;
  font-size: 40px;
}

@keyframes dots {
  33% { content: "...."; }
  66% { content: "....."; }
}

img {
  width: auto;
  height: 40%;
}
</style>