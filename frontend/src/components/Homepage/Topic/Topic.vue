<template>
  <Nava :show-context="false" :show-dashboard="false" :show-selected="false" />

  <div class="card-container">
    <div class="sub-nav-wrapper">
      <div class="sub-nav">
        <label for="selection">Sort By:</label>
        <select v-model="selectedCategory" @change="filterCards" id="selection">
          <option value="">All categories</option>
          <option value="Algorithm">Algorithm</option>
          <option value="Unsupervised">Unsupervised</option>
          <option value="Supervised">Supervised</option>
        </select>
      </div>
    </div>
    <div class="cards-wrapper">
      <div
          v-for="(card, index) in filteredCards"
          :key="index"
          class="card"
          @click="goToContext(card.topicTitle)"
      >
        <h2 class="card-title">{{ card.topicTitle }}</h2>
        <span>{{ card.topicDescription }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nava from "@/components/nav.vue";

export default {
  name: 'Topic',
  components: {
    Nava,
  },
  data() {
    return {
      cards: [],
      selectedCategory: '',
    };
  },
  computed: {
    filteredCards() {
      if (!this.selectedCategory) return this.cards;
      return this.cards.filter(card => card.category === this.selectedCategory);
    }
  },
  methods: {
    goToContext(topicTitle) {
      this.$router.push({ name: 'Context', query: { formattedTitle: topicTitle  } });
    },
    filterCards() {
      // This method is called when the select value changes
      // The filtering is handled by the computed property
    },
    async fetchTopics() {
      try {
        const response = await axios.get('http://localhost:8080/topics/all');
        this.cards = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      }
    }
  },
  mounted() {
    this.fetchTopics();
  }
};
</script>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  box-sizing: border-box;
}

.sub-nav-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  height: 6vh;
}

.sub-nav {
  display: inline-block;
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 10px;
  font-size: 20px;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  margin-left: 100px;
}

.card {
  background: linear-gradient(174deg, rgba(197,218,248,1) 0%, rgba(255,255,255,1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: calc(28%);
  margin: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  color: #257efa;
  background-color: white;
  border-radius: 5px;
  display: inline-block;
  padding: 4px;
  margin-bottom: 10px;
  font-size: 20px;
}

select {
  font-size: 20px;
  border: none;
  background-color: #e9e9e9;
  margin-left: 10px;
}

span {
  display: block;
  margin-top: 10px;
}
</style>

<style>
body {
  background-color: #F6F6F6;
}
</style>