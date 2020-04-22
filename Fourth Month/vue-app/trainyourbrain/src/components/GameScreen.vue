<template>
    <div id="game">
        <p>{{ expression }}</p>
        <input type="number" v-model.number="userAnswer">
        <button type="submit" @click="click">=</button>
    </div>
</template>

<script>
import eventBus from '../bus';
export default {
    name : "GameScreen",
    data(){
        return({
            userAnswer : ""
        })
    },
    methods : {
        click(){
            eventBus.$emit('onAnswer', this.userAnswer);
            this.userAnswer = "";
        }
    },
    props : {
        expression : String
    }
}
</script>

<style>

</style>