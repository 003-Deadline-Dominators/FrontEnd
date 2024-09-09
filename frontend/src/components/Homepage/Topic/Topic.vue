<template>
  <div>
    <div class="nav">
      <img src="../../../assets/Topic/Context/Question/code.svg" alt="Logo">
      <button id="start">Module</button>
      <button id="admin">admin login</button>
    </div>
    <div class="sub-nav">
      <label for="sub-nav">Sort By:</label>
      <select name="selection" id="selection">
        <option value="All categories">All categories</option>
        <option value="Algorithm">Algorithm</option>
        <option value="Unsupervised">Unsupervised</option>
        <option value="Supervised">Supervised</option>
      </select>
    </div>
    <div class="card-container">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToContext()"
           style="cursor: pointer;">
        <h2 class = "card-title">{{ card.title }}</h2>
        <span>{{ card.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data() {
    return {
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
    goToContext() {
      this.$router.push({name: 'Context'});
    }
  }
};
</script>

<style scoped>
template{
  background-color: #eeeeee;
}
body{
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
}
.nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
}
.sub-nav {
  display: inline-block; /* Restrict width to fit content */
  text-align: right;
  padding: 10px 20px; /* Adjust padding around the text and select */
  background-color: #e9e9e9;
  border: 1px solid #ccc; /* Optional: a softer color for the border */
  border-radius: 10px;
  margin: 20px; /* Add some margin to separate it from other elements */
}


.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  background-color: #eeeeee;
}

.card {
  background: rgb(197,218,248);
  background: linear-gradient(174deg, rgba(197,218,248,1) 0%, rgba(255,255,255,1) 30%);
  padding: 20px;
  border-radius: 5px;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
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
</style>
