import { createStore } from 'vuex';
import icon from '@/assets/icon.svg'; // Import the default icon

export default createStore({
    // Define the state of the application
    state() {
        return {
            showDashboard: false,
            currentIcon: icon, // Add currentIcon to the state
        };
    },

    //Define mutations to change the state synchronously
    mutations: {
        setShowDashboard(state, value) {
            state.showDashboard = value;
        },
        setCurrentIcon(state, value) {
            state.currentIcon = value;
        },
    },

    // Define actions to commit mutations
    actions: {
        toggleDashboard({ commit }, value) {
            commit('setShowDashboard', value);
        },
        updateIcon({ commit }, value) {
            commit('setCurrentIcon', value);
        },
    },
    getters: {
        showDashboard: (state) => state.showDashboard,
        currentIcon: (state) => state.currentIcon, // Add a getter for currentIcon
    },
});