<template>
  <div>
    <div class="nav">
      <div class="original-nav">
      <img :src="logo" alt="Logo" width="300" height="150">
      <button id="start">Module</button>
      </div>
      <div class="image-input-container">
        <img :src="icon" @click="toggleInput"
             alt="Clickable image"
             style="cursor: pointer;" class="clickable-image">
        <input
            v-if="showInput"
            v-model="inputValue"
            type="text"
            placeholder="Enter text here"
            class="input-field"
        />
      </div>
    </div>

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
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToContext"
           style="cursor: pointer;">
        <h2 class="card-title">{{ card.title }}</h2>
        <span>{{ card.description }}</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg';   // Import logo
import icon from '@/assets/Topic/icon.svg';

export default {
  name: 'Topic',
  data() {
    return {
      logo, // Bind logo to the data
      icon,
      showInput: false,
      inputValue: '',
      cards: [
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },

        // Add more card objects here
      ],
    };
  },
  methods: {
    goToContext() {
      this.$router.push({name: 'Context'});
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
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
  max-width: 100%;
  height: auto;
}

.input-field {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}
.card-container {
  width: 100%;
  background-color: #F6F6F6;
  padding: 20px;
  box-sizing: border-box;
}

.sub-nav-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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
}

.card {
  background: linear-gradient(174deg, rgba(197,218,248,1) 0%, rgba(255,255,255,1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: calc(25% - 20px); /* Adjust for margin */
  margin: 3%;
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
  margin-right: 20px;
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