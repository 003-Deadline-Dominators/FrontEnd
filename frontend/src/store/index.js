import { createStore } from 'vuex';
import icon from '@/assets/icon.svg'; // Import the default icon

export default createStore({
    state() {
        return {
            showDashboard: false,
            currentIcon: icon, // Add currentIcon to the state
            showInputGlobally: true, // State to control input field visibility globally
            isLoggedIn: false, // State to track if the user is logged in
        };
    },
    mutations: {
        setShowDashboard(state, value) {
            state.showDashboard = value;
        },
        setCurrentIcon(state, value) {
            state.currentIcon = value;
        },
        setShowInputGlobally(state, value) {
            state.showInputGlobally = value;
        },
        setIsLoggedIn(state, value) {
            state.isLoggedIn = value; // Mutation to set login status
        },
    },
    actions: {
        toggleDashboard({ commit }, value) {
            commit('setShowDashboard', value);
        },
        updateIcon({ commit }, value) {
            commit('setCurrentIcon', value);
        },
        toggleShowInputGlobally({ commit }, value) {
            commit('setShowInputGlobally', value);
        },
        setIsLoggedIn({ commit }, value) {
            commit('setIsLoggedIn', value); // Action to set login status
        },
    },
    getters: {
        showDashboard: (state) => state.showDashboard,
        currentIcon: (state) => state.currentIcon,
        showInputGlobally: (state) => state.showInputGlobally,
        isLoggedIn: (state) => state.isLoggedIn, // Getter for login status
    },
});
