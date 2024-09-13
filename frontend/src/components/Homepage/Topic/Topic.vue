<template>
  <Nava :show-context="false" :show-dashboard="false" :show-selected="false"/>

  <div class="card-container">
    <div class="sub-nav-wrapper">
      <div class="sub-nav">
        <label for="sub-nav">Sort By:</label>
        <select name="selection" id="selection">
          <option value="All categories">All categories</option>
          <option value="Algorithm">Algorithm</option>
          <option value="Unsupervised">Unsupervised</option>
          <option value="Supervised">Supervised</option>
        </select>
      </div>
    </div>
    <div class="cards-wrapper">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToContext(card.topicTitle)"
           style="cursor: pointer;">
        <h2 class="card-title">{{ card.topicTitle }}</h2>
        <span>{{ card.topicDescription }}</span> <!-- Corrected typo here -->
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg';   // Import logo
import icon from '@/assets/icon.svg';
import axios from "axios";
import Nava from "@/components/nav.vue";

export default {
  name: 'Topic',
  components: {
    Nava,
  },
  data() {
    return {
      logo, // Bind logo to the data
      icon,
      showInput: false,
      inputValue: '',
      cards: [], // Store topics data here
    };
  },
  methods: {

    goToContext(topicTitle) {
      this.$router.push({ name: 'Context', query: { topicTitle } });
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
    checkPasscode() {
      if (this.inputValue === "passcode") {
        this.$router.push('/dashboard');
      } else {
        alert("Incorrect passcode");
      }
    },
  },
  mounted() {
    // Axios call to retrieve data from backend
    axios
        .get('http://localhost:8080/topics/all')
        .then(response => {
          console.log(response.data); // Check the structure here
          this.cards = response.data; // Ensure this matches the data structure
        })
        .catch(error => {
          console.error("Error fetching data:", error); // Log the error
          alert("Failed to load data. Please try again later."); // Show a user-friendly message
        });
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
  border-style: none;
}

.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  background-color: #F6F6F6;
  box-sizing: border-box;
}

.sub-nav-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  height: 6vh;
  font-size: 20px;
}

.sub-nav {
  display: inline-block;
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 10px;

}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
}

.card {
  background: linear-gradient(174deg, rgba(197,218,248,1) 0%, rgba(255,255,255,1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: calc(25% - 20px); /* Adjust for margin */
  margin: 2%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


.card-title {
  color: #257efa;
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
  border: none;
  background-color: #e9e9e9;

}

span{
  padding-top: 10px;
  display: flex;
}

h2{
  font-size: 24px;
}
button{
  margin-left: 14%;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
</style>
<style>
body {
  background: #F6F6F6;
}
</style>