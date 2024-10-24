<template>
  <Nava :show-context="false" :show-dashboard="false" :show-selected="false" />

  <div class="card-container">
    <div class="cards-wrapper">
      <div
          v-for="(card, index) in filteredCards"
          :key="index"
          class="card"
          @click="goToContext(card.topicTitle, card.colorPair.background, card.colorPair.titleColor)"
          :style="{
      background: card.colorPair.background,
  }"
      >
        <h2
            class="card-title"
            :style="{ color: card.colorPair.titleColor }"
        >
          {{ card.topicTitle }}
        </h2>
        <span>{{ card.topicDescription }}</span>
        <star-rating
            class="rating"
            :rating="card.rating"
            :read-only="true"
            active-color="#FFA82B"
            inactive-color="#EAEBFC"
            :star-size="24"
            padding="1"
            :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
            :show-rating="false"
        ></star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nava from "@/components/nav.vue";
import StarRating from 'vue-star-rating';

export default {
  name: "Topic",
  components: {
    Nava,
    StarRating,
  },
  data() {
    return {
      cards: [],
      selectedCategory: "",
      colorPairs: [
        {
          background: "linear-gradient(174deg, rgba(197,218,248,1) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#257efa"
        },
        {
          background: "linear-gradient(174deg, rgba(255,212,203,1) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#FF5630"
        },
        {
          background: "linear-gradient(174deg, rgba(255,213,127,1) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#FFAB00"
        },
        {
          background: "linear-gradient(174deg, rgba(198,241,219,1) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#1EC772"
        },
        {
          background: "linear-gradient(174deg, rgba(166,174,186,0.9) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#4e6380"
        },
        {
          background: "linear-gradient(174deg, rgba(190,171,245,1) 0%, rgba(255,255,255,1) 30%)",
          titleColor: "#8260E6"
        }
      ],
    };
  },
  computed: {
    filteredCards() {
      if (!this.selectedCategory) return this.cards;
      return this.cards.filter(card => card.category === this.selectedCategory);
    },
  },
  methods: {
    goToContext(topicTitle, backgroundColor, titleColor) {
      this.$router.push({
        name: "Context",
        query: {
          formattedTitle: topicTitle,
          backgroundColor: backgroundColor,
          titleColor: titleColor,
        },
      });
    },
    async fetchTopics() {
      try {
        const response = await axios.get("http://54.252.5.239:8080/topics/all");
        this.cards = response.data;

        // Assign color pairs in order to each card
        this.cards.forEach((card, index) => {
          const colorIndex = index % this.colorPairs.length; // Ensure index wraps around
          card.colorPair = this.colorPairs[colorIndex];
        });

        console.log(this.cards);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      }
    },
  },
  mounted() {
    this.fetchTopics();
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.cards-wrapper {
  margin-top: 44px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  margin-left: 50px;
}

.card {
  padding: 10px;
  border-radius: 5px;
  width: calc(27.5%);
  margin: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  background-color: white;
  border-radius: 5px;
  display: inline-block;
  padding: 4px;
  margin-bottom: 10px;
  font-size: 18px;
}

span {
  display: block;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
}

.rating {
  margin-top: 20px;
}
</style>


<style>
body {
  background-color: #F6F6F6 !important;
}
</style>
