<template>
    <div id="game">
        <p>{{ this.$store.state.task.expression }}</p>
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
            console.log(this.userAnswer);
            eventBus.$emit('onAnswer', this.userAnswer);
            this.userAnswer = "";
        }
    }
}
</script>

<style>

</style>