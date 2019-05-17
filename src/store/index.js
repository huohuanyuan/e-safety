import Vue from 'vue';
import Vuex from 'vuex';

import caseData from "./modules/caseData";

// vuex
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        caseData,
       
    }
})

export default store;