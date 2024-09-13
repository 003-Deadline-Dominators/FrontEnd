import { createStore } from 'vuex';
import icon from '@/assets/icon.svg'; // Import the default icon

export default createStore({
    state() {
        return {
            showDashboard: false,
            currentIcon: icon, // Add currentIcon to the state
        };
    },
    mutations: {
        setShowDashboard(state, value) {
            state.showDashboard = value;
        },
        setCurrentIcon(state, value) {
            state.currentIcon = value;
        },
    },
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