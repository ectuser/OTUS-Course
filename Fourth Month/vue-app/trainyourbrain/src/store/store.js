import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        task : Object(),
        correctAnswers : 0
    },
    mutations : {
        changeTask(state, payload){
            state.task = {...payload};
        },
        increaseCorrectAnswers(state){
            state.correctAnswers++;
        }
    },
    actions : {
        changeTask(context, payload){
            context.commit('changeTask', payload);
        },
        increaseCorrectAnswers(context){
            context.commit('increaseCorrectAnswers');
        }
    }
})