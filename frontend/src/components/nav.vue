<template>
  <div class="nav">
    <div class="original-nav">
      <img :src="logo" alt="Logo" class="logo" @click="goToHomepage">
      <button v-if="showModule" @click="goToTopic" id="start" :class="{'inactive': isDashboardRoute}">Module</button>
      <button v-if="showContext" @click="goToContext" id="context">Context</button>
      <button v-if="showSelected" id="selected">Question</button>
    </div>
    <div class="button-and-image-container">
      <button v-if="showDashboard" @click="goToDashboard" id="dashboard" :class="{'active': isDashboardRoute, 'inactive': !isDashboardRoute}">Dashboard</button>
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
    ...mapGetters(['showDashboard', 'currentIcon']),
    isDashboardRoute() {
      return this.$route.path === '/dashboard';
    }
  },
  methods: {
    ...mapActions(['toggleDashboard', 'updateIcon']),
    goToTopic() {
      this.$router.push('/topic');
    },
    goToContext() {
      this.$router.push({
        path: '/topic/context',
        query: {
          formattedTitle: this.$route.query.topicTitle
        }
      });
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
    goToHomepage() {
      this.$router.push('/');
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
.logo {
  width: 195px;
  height: 34px;
}
.nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 2%;
  align-items: center;
}

.original-nav {
  display: flex;
  align-items: center;
}

.button-and-image-container {
  display: flex;
  align-items: center;
  gap: 80px; /* Adjust spacing between the button and image input container */
}

.image-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
}

.clickable-image {
  cursor: pointer;
  width: 60px;
  height: auto;
}

.input-field {
  position: absolute;
  margin-top: 70px;
  width: 100%;
  max-width: 180px;
}

button {
  margin-left: 50px;
  padding: 10px 20px;
  border-radius: 5px;
  border-style: none;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  transition-duration: 0.4s;
}

#start {
  background-color: #cbf4b1;
}

#start:hover {
  background-color: #96EA63;
}

#context {
  background-color: #96EA63;
}

#context:hover {
  background-color: #79e538;
}

#selected {
  background-color: #79e538;
}

#dashboard {
  background-color: #F2F2F2;
  align-items: center;
  justify-content: center;
  width: fit-content;
}

button.active {
  background-color: #96EA63 !important;
}

button.inactive {
  background-color: #F2F2F2 !important;
}

button.inactive:hover {
  background-color: #96EA63 !important;
}
</style>
