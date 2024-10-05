<template>
    <Nava :showModule="false" :show-context="false" :show-dashboard="false" :show-selected="false" />
    <div class="start">
      <div class="welcome-wrapper">
        <h1 class = "welcome">Welcome to CodeCraft</h1>
        <p>Unleash the power of coding with hands-on learning. CodeCraft is your gateway to mastering essential programming concepts through real-world problem-solving.</p>
      </div>
      <div class="button-rows">
        <button @click="goToTopic" id="start">Start</button>
        <button @click="scrollToSection" id="learn">Learn More</button>
      </div>
    </div>
    <div class="content-wrapper">
      <h2 ref="targetSection">Explore Our Platform</h2>
      <h3>Function introduction</h3>
      <div class="content-section-left">
        <h1>Simple way to manage your contacts</h1>
        <p>Background description of contacts usually involves the part of a system used to manage and maintain contact information between users or enterprises</p>
      </div>
      <div class="content-section-right">
        <h1>This includes the types of tasks and how they are as</h1>
        <p>It is suitable for tasks with high real-time requirements and short time consuming, such as state saving and data compression. This type of task usually needs to be completed in a</p>
      </div>
     <div class="content-section-left">
       <h1>Data collection and integrated storage and processing</h1>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu diam ut condimentum lacinia. Sagittis, maecenas sed tristique dolor sed. Mauris nunc fames tincidunt id hac lacus, donec. </p>
     </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToTopic() {
      this.$router.push('/topic');  // Push to lowercase '/topic'
    }
  }
}
</script>

<script setup>
import Nava from '@/components/nav.vue';
import { ref } from 'vue';

const targetSection = ref(null);

const scrollToSection = () => {
  const top = targetSection.value.offsetTop; // Get the target section's vertical offset
  window.scrollTo({
    top: top, // Scroll to the target position
    behavior: 'smooth' // Enable smooth scrolling
  });
};
</script>

<style scoped>
/* Your styles here */
/* Removed the universal selector that was setting the background to white */
.nav button {
  padding: 10px;
}
.start{
  height: 100vh;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/home-back.gif");
  background-repeat: no-repeat;
  background-size: 100%;
}

.start h1{
  width: 50%;
  margin-left: 5%;
}
.start p{
  width: 30%;
  margin-left: 5%;
}
#start{
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px;
  transition: background-color 0.3s ease;
}

#start:hover{
  background-color: #79e538;
}

.welcome{
  text-shadow: 4px 4px #eeeeee;
}

.button-rows{
  display: flex;
  flex-direction: row;
}
button{
  font-size: 20px;
  border-radius: 5px;
  width: 12%;
  background-color: #96ea63;
  border-style: none;
  padding: 10px;
  margin-left: 5%;
}
button#learn{
  background-color: white;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px;
  transition: background-color 0.3s ease;
}
button#learn:hover{
  background-color: #96ea63;
}
.content-wrapper{
  background-color: white; /* If you want the content wrapper to have a white background */
  text-align: center;
  flex-direction: column;
}
.content-section-left{
  background-color: white; /* Apply background color only to sections that need it */
  height: 25vh;
  margin: 5%;
  text-align: left;
  width: 30%;
}
.content-section-right{
  background-color: white; /* Apply background color only to sections that need it */
  height: 30vh;
  margin: 5%;
  text-align: right;
  width: 30%;
  padding-left: 60%;
}

h2{
  font-size: 40px;
  text-align: center;
}
h3{
  font-size: 22px;
  font-weight: normal;
  color: grey;
}
.nav img {
  width: 260px; /* Adjust this size as needed */
  height: auto; /* This will maintain the aspect ratio */
}
</style>

<style>
body{
  background-color: white;
}

</style>