<template>
  <Nava :show-dashboard="false" :show-selected="false"/>
  <div class="card-container">
    <div class="card" v-for="(card,index) in cards" :key="index" @click="gotoToQuestion(this.$route.query.formattedTitle, card.contextTitle)"
         style="cursor: pointer;" :style="{ background: this.$route.query.backgroundColor }" >
      <h2 class="card-title" :style="{ color: this.$route.query.titleColor }" >{{ this.$route.query.formattedTitle}}</h2>
      <div class="content-wrapper">
        <h4>{{ card.contextTitle }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg';
import icon from '@/assets/icon.svg';
import axios from "axios";
import Nava from "@/components/nav.vue";

export default {
  name: 'Topic',
  components: {Nava},
  data() {
    return {
      logo,
      icon,
      cards: [],
      ipAddress: ''
    };
  },
  methods: {
    gotoToQuestion(topicTitle, contextTitle) {
      this.$router.push({
        name: 'Question',
        query: {
          topicTitle: topicTitle,
          contextTitle: contextTitle
        }
      });
    },
    calculatePercentage(value) {
      // Treat 40 as 100%, cap at 100%
      return Math.min(Math.round((value / 40) * 100), 100);
    }
  },
  mounted() {
    const topicTitle = encodeURIComponent(this.$route.query.formattedTitle).replaceAll('%2F', '%252F');
    console.log(topicTitle);


    if (topicTitle) {
      axios
          .get(`http://54.252.5.239:8080/topics/contexts/${topicTitle}`)
          .then(response => {
            this.cards = response.data;
          })
          .catch(error => {
            console.error("Error fetching context data:", error);
          });
    }
  }
}
</script>

<style scoped>
/* Styles remain unchanged */
.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 40px 20px 20px 24px;
  background-color: #F6F6F6;
  box-sizing: border-box;
}

.card {
  background: rgb(234, 228, 250);
  background: linear-gradient(174deg, rgba(234, 228, 250, 1) 0%, rgba(255, 255, 255, 1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-title {
  color: #8260e6;
  border-radius: 5px;
  border-style: hidden;
  border-width: 2px;
  display: inline;
  padding: 4px;
  font-size: 20px;
  background-color: white;
}

.progress-container {
  width: 24%;
  justify-content: flex-end;
  margin-left: auto;
  background-color: #EAEBFC;
  margin-top: 10px;
}

.progress-bar {
  height: 10px;
  background-color: #FFA82B;
  transition: width 0.5s ease-in-out;
}

h4{
  font-weight: normal;
  font-size: 18px;
}
</style>

<style>
body {
  background: #F6F6F6;
}
</style>