<template>
  <div class="nav">
    <div class="original-nav">
      <img :src="logo" alt="Logo">
      <button v-if="showModule" @click="goToTopic" id="start">Module</button>
      <button v-if="showContext" id="context">Context</button>
      <button v-if="showSelected" id="selected">question</button>
    </div>
    <button v-if="showDashboard" @click="goToDashboard" id="dashboard">dashboard</button>
    <div class="image-input-container">
      <img :src="currentIcon" @click="toggleInput"
           alt="Clickable image"
           style="cursor: pointer;" class="clickable-image">
      <input
          v-if="showInput"
          v-model="inputValue"
          type="text"
          placeholder="🔑：please enter password"
          class="input-field"
          @keyup.enter="checkPasscode"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logo from '@/assets/logo.svg';
import user from '@/assets/user.svg';

export default {
  name: 'nav',
  props: {
    showModule: {
      type: Boolean,
      default: true
    },
    showContext: {
      type: Boolean,
      default: true
    },
    showSelected: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      logo,
      user,
      showInput: false,
      inputValue: '',
    }
  },
  computed: {
    ...mapGetters(['showDashboard', 'currentIcon'])
  },
  methods: {
    ...mapActions(['toggleDashboard', 'updateIcon']),
    goToTopic() {
      this.$router.push('/topic');
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    checkPasscode() {
      if (this.inputValue === "passcode") {
        this.toggleDashboard(true);
        this.updateIcon(user);
        this.$router.push('/dashboard');
      } else {
        alert("Incorrect passcode");
      }
    },
  }
}
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
  margin-right: 100px;
}

.input-field {
  position: absolute;
  margin-top: 70px;
  margin-right: 100px;
  width: 100%;
  max-width: 180px;
}
button{
  margin-left: 11%;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
#start{
  background-color: #cbf4b1;
}
#selected{
  background-color: #79e538;
}
#dashboard{
  display: flex;
  align-items: center;
  margin-left: 380px;
  width: fit-content;

}

</style>