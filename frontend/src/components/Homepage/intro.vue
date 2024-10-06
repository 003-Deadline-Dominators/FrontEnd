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
      <div class="content-section">
        <img :src="intro1" alt="image">
        <div class="content-text-left">
        <h1>Discover an interesting way to take coding challenges</h1>
        <p>Choose a data-processing topic that interests you, and unlock a range of exciting, real-world contexts to explore and master!</p>
          </div>
      </div>
      <div class="content-section">
        <div class="content-text-right">
          <h1>Concise question page layout</h1>
          <ul>
            <li>Drag and drop code snippets to reorder;</li>
            <li>Fold or expand questions; depending on your own favor</li>
            <li>Keep in mind that indentation always matters!</li>
          </ul>
        </div>
        <img :src="intro2" alt="image">
      </div>
      <div class="content-section">
        <img :src="intro3" alt="image">
        <div class="content-text-right">
          <h1>Immidiate IDE look and feedback</h1>
          <p>Connected to a Python Integrated Development Environment (IDE), CodeCraft gives you a real-time coding experience just like in a professional IDE. You'll receive instant, IDE-style feedback, helping you quickly spot errors —making it easier to learn and refine your skills as you go!</p>
        </div>
      </div>
      <div class="content-section">
        <div class="content-text-right">
          <h1>Powerful tools to improve your experience</h1>
          <ul>
          <li>Submit: Click ‘Submit’ to receive feedback on the question, including duration, number of attempts and IDE-styled feedback.</li>
            <li>Reset: Click ‘’Reset’ to regenerate a question of the same topic and context.</li>
            <li>Rebuild: Click ’Rebuild’ to revert all changes.</li>
            <li>Hint: Click ‘Hint’ to receive a clue of the code.</li>
          </ul>
        </div>
        <img :src="intro4" alt="image">
      </div>
      <div class="content-section">
        <img :src="intro5" alt="image">
        <div class="content-text-right">
          <h1>Log in to view statistical analysis on students’ performance</h1>
          <p>Follow one-step login by clicking ‘Admin Login’ and entering password. It will get you into the dashboard containing all meaningful information for analyzing students’ performance, including User ID, Topic, Context, Time Stamp, Time Taken and Percentage of Correctness.</p>
        </div>
      </div>
      <h1>test</h1>
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
import intro1 from '@/assets/intro/intro1.png'
import intro2 from '@/assets/intro/intro2.png'
import intro3 from '@/assets/intro/intro3.png'
import intro4 from '@/assets/intro/intro4.png'
import intro5 from '@/assets/intro/intro5.png'
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
.content-section{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white; /* Apply background color only to sections that need it */
  height: 30vh;
  margin: 100px;
  text-align: left;
}

.content-text-left{
  width: 44%;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.content-text-right{
  width: 44%;
  text-align: left;
  display: flex;
  flex-direction: column;
}
img{
  width: auto;
  height: 140%;
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