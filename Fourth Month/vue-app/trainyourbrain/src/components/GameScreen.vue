<template>
    <div id="game">
        <p>{{ this.$store.state.task.expression }}</p>
        <input type="number" v-model.number="userAnswer">
        <button type="submit" @click="click">=</button>
        <b-container>
        <b-row>
            <b-col xs="3" class="text-center">
                <div class="circle"><span>1</span></div>
            </b-col>
            <b-col xs="3" class="text-center">
                <div class="circle"><span>1</span></div>
            </b-col>
            <b-col xs="3" class="text-center">
                <div class="circle"><span>1</span></div>
            </b-col>
            <b-col xs="3" class="text-center">
                <div class="circle"><span>1</span></div>
            </b-col>
        </b-row>
        </b-container>
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
    .circle{
        border-radius: 50%;
        background: #d3b167;
        width: 50px;
        height: 50px;
        margin: 0 auto;

        position: relative;
    }
    .circle > span{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
</style>