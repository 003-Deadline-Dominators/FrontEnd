<template>
  <div>
    <div class="nav">
      <div class="original-nav">
        <img :src="logo" alt="Logo" width="300" height="150">
        <button @click="goToTopic" id="module">Module</button>
        <button id="context">Context</button>
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
      <div class="card" v-for="(card,index) in cards" :key="index" @click="gotoToQuestion"
           style="cursor: pointer;">
        <h2 class = "card-title">{{ card.title }}</h2>
        <span>{{ card.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg';
import icon from '@/assets/Topic/icon.svg';
export default {

  name: 'Topic',
  data() {
    return {
      logo,
      icon,
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
        {
          title: 'Dataframe',
          description: 'Learn Angular js to build beautifull landingpage for your business',
        },
      ]
    };
  },

  methods: {
    goToTopic() {
      // This will navigate back to the /topic route
      this.$router.push('/topic');
    },
    gotoToQuestion() {
      this.$router.push({name :'Question'});
    }
  }
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  background-color: #F6F6F6;
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
