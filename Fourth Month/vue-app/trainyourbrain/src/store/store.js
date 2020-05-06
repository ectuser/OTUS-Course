import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        task : Object(),
        correctAnswers : 0,
        tasksAmount : 0,
        allTime : 0,
        spentTime : 0,
        todayData : {
            trainingDay : 0,
            lastResult : Object(),
            results : []
        }
    },
    mutations : {
        changeTask(state, payload){
            state.task = {...payload};
        },
        increaseCorrectAnswers(state){
            state.correctAnswers++;
        },
        increaseTasksAmount(state){
            state.tasksAmount++;
        },
        setAllTime(state, time){
            state.allTime = time;
        },
        increaseSpentTime(state){
            state.spentTime++;
        },
        setTodayData(state, payload){
            state.todayData = {
                trainingDay : payload.trainingDay,
                lastResult : {...payload.lastResult},
                results : [...payload.results]
            }
        }
    },
    actions : {
        changeTask(context, payload){
            context.commit('changeTask', payload);
        },
        increaseCorrectAnswers(context){
            context.commit('increaseCorrectAnswers');
        },
        increaseTasksAmount(context){
            context.commit('increaseTasksAmount');
        },
        setAllTime(context, time){
            context.commit('setAllTime', time);
        },
        increaseSpentTime(context){
            context.commit('increaseSpentTime');
        },
        setTodayData(context, payload){
            context.commit('setTodayData', payload);
        }
    },
    getters: {
        getLeftTimeInNiceFormat(state){
            let allTime = state.allTime;
            let spentTime = state.spentTime;
            let difference = allTime - spentTime;
            var mins = ~~((difference % 3600) / 60);
            var secs = ~~difference % 60;
            
            var ret = "";

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },
        getResultsAverage(state){
            console.log(state);
            let a = 2 + 2;
            console.log(a);
            if (state.todayData.results.length === 0){
                return "first-day";
            }
            let sum = 0;
            for (let res of state.todayData.results){
                sum += parseFloat(res);
            }
            return sum / state.todayData.results.length;
        }
    }
})