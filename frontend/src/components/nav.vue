<template>
  <div class="nav">
    <div class="original-nav">
      <img :src="logo" alt="Logo" class="logo" @click="goToHomepage">
      <button v-if="showModule" @click="goToTopic" id="start" :class="{'inactive': isDashboardRoute}">Module</button>
      <button v-if="showContext" @click="goToContext" id="context">Context</button>
      <button v-if="showSelected" id="selected">Question</button>
    </div>
    <div class="button-and-image-container">
      <div v-if="showDashboard" class="dashboard-container" id="dashboard" :class="{'active': isDashboardRoute, 'inactive': !isDashboardRoute}" @click="goToDashboard">
        <img :src="dashboard" alt="Dashboard">
        <button :class="{'active': isDashboardRoute, 'inactive': !isDashboardRoute}" >Dashboard</button>
      </div>
      <div class="image-input-container">
        <img :src="currentIcon" @click="toggleInputOrLogout"
             alt="Clickable image"
             style="cursor: pointer;" class="clickable-image">
        <!-- Display the input field only if not logged in and if globally allowed -->
        <div v-if="!isLoggedIn && showInput && showInputGlobally" class="input-wrapper">
          <input
              v-model="inputValue"
              type="text"
              placeholder="🔑：please enter password"
              class="input-field"
              @keyup.enter="checkPasscode"
          />
        </div>
        <!-- Display the logout button only if logged in and logout button is toggled -->
        <button v-if="isLoggedIn && showLogoutButton" @click="logout" class="logout-button">Log out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logo from '@/assets/logo.svg';
import user from '@/assets/user.svg';
import icon from '@/assets/icon.svg';
import dashboard from '@/assets/dashboard.svg';
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
      icon,
      dashboard,
      showInput: false,
      inputValue: '',
      showLogoutButton: false, // New state to control the visibility of the logout button
    }
  },
  computed: {
    ...mapGetters(['showDashboard', 'currentIcon', 'showInputGlobally', 'isLoggedIn']),
    isDashboardRoute() {
      return this.$route.path === '/dashboard';
    }
  },
  methods: {
    ...mapActions(['toggleDashboard', 'updateIcon', 'toggleShowInputGlobally', 'setIsLoggedIn']),
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
    toggleInputOrLogout() {
      if (!this.isLoggedIn && this.showInputGlobally) {
        this.showInput = !this.showInput;
      } else if (this.isLoggedIn) {
        this.showLogoutButton = !this.showLogoutButton; // Toggle the logout button visibility when logged in
      }
    },
    goToHomepage() {
      this.$router.push('/');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    checkPasscode() {
      if (this.inputValue === "passcode") {
        this.login();
      } else {
        alert("Incorrect passcode");
      }
      this.inputValue = '';
    },
    login() {
      this.$store.commit('setIsLoggedIn', true);
      this.showInput = false;
      this.$store.dispatch('toggleDashboard', true);
      this.$store.dispatch('updateIcon', this.user);
      this.$store.dispatch('toggleShowInputGlobally', false);
      this.$router.push('/dashboard');
    },
    logout() {
      this.setIsLoggedIn(false);
      this.toggleDashboard(false); // Hide dashboard button
      this.updateIcon(this.icon); // Set icon back to default
      this.toggleShowInputGlobally(true); // Show input globally when logged out
      this.showLogoutButton = false; // Hide the logout button
      this.$router.push('/'); // Redirect to homepage
    },
  }
}
</script>
<style scoped>
.logo {
  width: auto;
  height: 50px;
  transition: transform 0.3s ease;
}

.logo:hover{
  cursor: pointer;
  transform: scale(1.05);
}
.nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 1%;
  align-items: center;
}

.original-nav {
  display: flex;
  align-items: center;
}

.button-and-image-container {
  display: flex;
  align-items: center;
}

.image-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 110px;
}

.clickable-image {
  cursor: pointer;
  width: 60px;
  height: auto;
  transition: transform 0.3s ease;
}

.clickable-image:hover {
  transform: scale(1.12);
}

.input-field {
  position: absolute;
  right: 60px;
  margin-top: 4px;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
}

button {
  margin-left: 50px;
  padding: 10px 20px;
  border-radius: 8px;
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
  transform: scale(1.1);
}

#context {
  background-color: #96EA63;
}

#context:hover {
  background-color: #79e538;
  transform: scale(1.1);
}

#selected {
  background-color: #79e538;
}

.dashboard-container{
  display: flex;
  background-color: #96EA63;
  width: 130px;
  padding: 10px 8px;
  margin-right: 37px;
  transition-duration: 0.4s;
  justify-content: space-between;
  border-radius: 8px;
}

.dashboard-container img{
  width: 20px;
}

.dashboard-container button{
  padding: 0;
  margin: 0;
}

#dashboard:hover {
  transform: scale(1.1);
}

.active {
  background-color: #96EA63 !important;
}

.inactive{
  background-color: #F2F2F2 !important;}

.inactive:hover {
  background-color: #96EA63 !important;
  button {
    background-color: #96EA63 !important;
  }
}

.logout-button {
  display: flex;
  align-items: center;
  position: absolute;
  margin-top: 10px;
  margin-left: 190px;
  padding: 10px 10px;
  cursor: pointer;
  width: fit-content;
  background-color: #96EA63;
}

.logout-button:hover {
  background-color: red;
  color: white;
}
</style>
