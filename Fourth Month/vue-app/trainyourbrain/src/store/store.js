import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        task : Object()
    },
    mutations : {
        changeTask(state, payload){
            state.task = {...payload};
        }
    },
    actions : {
        changeTask(context, payload){
            context.commit('changeTask', payload);
        }
    }
})