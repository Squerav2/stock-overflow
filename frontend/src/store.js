import { createStore } from 'vuex';

const initialState = {
    user: null
};

// Create the Vuex store
const store = createStore({
    state: initialState,
    mutations: {
        LOGIN(state, payload) {
            state.user = {
                ...state.user,
                email: payload.email,
                name: payload.name,
                surname: payload.surname,
            };
            console.log(state.user);
        },
        LOGOUT(state) {
            state.user = null;
        },
    },
});

export default store;