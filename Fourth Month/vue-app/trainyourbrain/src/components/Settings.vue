<template>
    <div id="settings">
        <b-container>
            <header class="mb-4">
                <h2>Hi!</h2>
                <div>Welcome to your {{this.$store.state.todayData.trainingDay}} training math day</div>
                <div v-if="this.$store.state.todayData.results.length !== 0">Your last result was {{this.$store.state.todayData.lastResult.correctAnswers}} task of {{this.$store.state.todayData.lastResult.tasksAmount}} was solved</div>
                <div v-if="this.$store.state.todayData.results.length !== 0">Average success is {{this.$store.getters.getResultsAverage}}</div>
            </header>
        <b-form @submit="onSubmit" onSubmit="return false;">
            <b-form-group
                id="input-group-1"
                label="Settings:"
                label-for="input-1"
                :description="`Duration: ${form.duration} minutes`"
            >
                <b-form-input
                    id="input-1"
                    type="range"
                    required
                    min="1" 
                    max="15"
                    v-model.number="form.duration"
                >
                </b-form-input>   
            </b-form-group>
            <b-form-group
                id="input-group-2"
                :description="`Defficulty: ${form.difficulty}`"
            >
                <b-form-input
                    id="input-2"
                    type="range"
                    required
                    min="1" 
                    max="10"
                    v-model.number="form.difficulty"
                >
                </b-form-input>   
            </b-form-group>
            <div class="text-left">
                <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="form.selectedOperations"
                    :options="Object.keys(operators)"
                    name="flavour-1"
                    stacked
                ></b-form-checkbox-group>
            </div>
            <b-button type="submit" variant="primary">Start</b-button>
      </b-form>
    </b-container>
    </div>
</template>



<script>
import eventBus from '../bus';
import { mapActions } from 'vuex'
export default {
    name: 'Settings',
    data(){
        return({
            operators :{ 
                "addition" : "+",
                "substuction" : "-",
                "multiplication" : "*",
                "division" : "/",
                "exponentiation" : "**"
            },
            form : {
                duration : 7,
                difficulty : 5,
                selectedOperations : []
            }
        });
    },
    methods : {
        ...mapActions(['setTodayData']),
        async onSubmit(){
            if (this.form.selectedOperations.length === 0){
                alert("Choose at least one operator");
                return;
            }
            const toUseOperators = await this.stringOperatorsNamesToSymbols(this.form.selectedOperations);
            eventBus.$emit('onPlay', this.form, toUseOperators);
        },
        async stringOperatorsNamesToSymbols(arr){
            let result = [];
            for (let operator of arr){
                console.log(operator, this.operators[operator])
                result.push(this.operators[operator])
            }
            return result;
        }
    },
    created(){
        let trainingDay = parseInt(localStorage.getItem('trainingDay'),10) || 0;
        let lastResult = JSON.parse(localStorage.getItem('lastResult')) || {};
        let results = JSON.parse(localStorage.getItem('results')) || {results : []};

        this.setTodayData({
            trainingDay : trainingDay,
            lastResult : lastResult,
            results : results.results
        });
    }

}
</script>
<style>
</style>



