<template>
  <div>
    <div class="nav">
      <img src="../../../../assets/Topic/Context/Question/code.svg" alt="Logo">
      <button id="start">Module</button>
      <button id="Context">Context</button>
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
      <div class="card" v-for="(card,index) in cards" :key="index"
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
    goToContext(card) {
      this.$router.push({name: 'context', params: {title: card.title}});
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
.sub-nav{
  padding: 20px;
  display: flex;
  justify-content: right;
  background-color: #eeeeee;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  background-color: #eeeeee;
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

</style>
