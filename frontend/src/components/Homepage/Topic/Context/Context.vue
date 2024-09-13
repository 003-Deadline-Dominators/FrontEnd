<template>
  <Nava :show-dashboard="false" :show-selected="false"/>

  <div class="card-container">
      <div class="card" v-for="(card,index) in cards" :key="index" @click="gotoToQuestion(this.$route.query.topicTitle, card.contextTitle)"
           style="cursor: pointer;">
        <h2 class = "card-title">{{ card.contextTitle }}</h2>
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
      cards: [
      ]
    };
  },

  methods: {
    goToTopic() {
      // This will navigate back to the /topic route
      this.$router.push('/topic');
    },
    gotoToQuestion(topicTitle, contextTitle) {
      const formattedTitle = `${topicTitle} : ${contextTitle}`;
      this.$router.push({name :'Question', query: { formattedTitle }});
    }

  },
  mounted() {
    const topicTitle = this.$route.query.topicTitle;

    if (topicTitle) {
      axios
          .get(`http://localhost:8080/topics/${topicTitle}`)
          .then(response => {
            this.cards = response.data;
          })
          .catch(error => {
            console.error("Error fetching context data:", error);
          });
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 2%;
  align-items: center;
}
.original-nav{
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
}
.image-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clickable-image {
  cursor: pointer;
  width: 60px;
  height: auto;
}

.input-field {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}

.card-container {
  width: 100%; /* Ensure it spans 100% of the parent container */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  background-color: #F6F6F6;
  box-sizing: border-box; /* Include padding and border in width calculations */
  margin: 0; /* Remove any default margins */
}

.card {
  background: rgb(234,228,250);
  background: linear-gradient(174deg, rgba(234,228,250,1) 0%, rgba(255,255,255,1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.card-title {
  color: #8260e6;
  border-radius: 5px;
  border-style: hidden;
  border-width: 2px;
  display: inline;
  padding: 4px;
  background-color: white;
}

p {
  display: flex;
  justify-content: space-between;
}

select {
  font-size: 20px;
  margin-right: 20px;
}

span{
  padding-top: 10px;
  display: flex;
}

h2{
  font-size: 24px;
}
button{
  margin-left: 11%;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
#module{
  background-color: #cbf4b1;
}
</style>
<style>
body {
  background: #F6F6F6;
}
</style>