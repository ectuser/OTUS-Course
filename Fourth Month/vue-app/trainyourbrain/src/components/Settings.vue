<template>
    <div id="settings">
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
                    v-model="form.duration"
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
                    v-model="form.difficulty"
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
    </div>
</template>

<script>
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
                duration : "7",
                difficulty : "5",
                selectedOperations : []
            }
        });
    },
    methods : {
        async onSubmit(){
            const toUseOperators = await this.stringOperatorsNamesToSymbols(this.form.selectedOperations);
            let tasks = [];
            for (let i = 0; i < 1000; i++){
                let newTask = await this.generateTask(toUseOperators);
                tasks.push(newTask);
            }
            console.log(tasks);
        },
        async stringOperatorsNamesToSymbols(arr){
            let result = [];
            for (let operator of arr){
                console.log(operator, this.operators[operator])
                result.push(this.operators[operator])
            }
            return result;
        },
        async generateTask(toUseOperators){
            // console.log(toUseOperators);
            let order = 1;
            let numberOfNumbers = 2;
            let task = {};
            if (this.form.difficulty === "2"){
                order = 1;
                numberOfNumbers = 3;
            }
            else if (this.form.difficulty === "2"){
                order = 2;
                numberOfNumbers = 3;
            }
            else if (this.form.difficulty === "3"){
                order = 3;
                numberOfNumbers = 3;
            }
            else if (this.form.difficulty === "4"){
                order = 3;
                numberOfNumbers = 4;
            }
            let strExpression = "";
            for (let i = 0; i < numberOfNumbers - 1; i++){
                strExpression += await this.generateNumber(order);
                let randomNumber = await this.generateRandomNumber(toUseOperators.length);
                strExpression += toUseOperators[randomNumber];
                
            }
            strExpression += await this.generateNumber(order);
            // strExpression += " = ";
            task.expression = strExpression;
            task.answer = eval(strExpression);
            return task;
            // task.answer = 
        },
        async generateNumber(order){
            return await this.generateRandomNumber(10**order);
        },
        async generateRandomNumber(max, min = 0){
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

}
</script>
<style>
</style>



