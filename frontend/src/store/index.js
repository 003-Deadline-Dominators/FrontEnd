import { createStore } from 'vuex';
import icon from '@/assets/icon.svg'; // Import the default icon

export default createStore({
    // Define the state of the application
    state() {
        return {
            showDashboard: false,
            currentIcon: icon,
            showInputGlobally: true,
            isLoggedIn: false,
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
        setShowInputGlobally(state, value) {
            state.showInputGlobally = value;
        },
        setIsLoggedIn(state, value) {
            state.isLoggedIn = value;
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
        toggleShowInputGlobally({ commit }, value) {
            commit('setShowInputGlobally', value);
        },
        setIsLoggedIn({ commit }, value) {
            commit('setIsLoggedIn', value);
        },
    },
    getters: {
        showDashboard: (state) => state.showDashboard,
        currentIcon: (state) => state.currentIcon,
        showInputGlobally: (state) => state.showInputGlobally,
        isLoggedIn: (state) => state.isLoggedIn,
    },
});
