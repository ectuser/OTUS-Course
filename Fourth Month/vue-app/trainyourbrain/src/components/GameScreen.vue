<template>
    <div id="game">
        <div class="calculator-container">
            <h3 class="text-center">{{ this.$store.state.task.expression }}={{this.userAnswer}}</h3>
            <input type="number" v-model.number="userAnswer">
            <button type="submit" @click="click">=</button>
            <b-row class="mb-5">
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>1</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>2</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>3</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle operation" @click="operationClickHandler"><span>&lt;</span></div>
                </b-col>
            </b-row>
            <b-row class="mb-5">
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>4</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>5</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>6</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle operation" @click="operationClickHandler"><span>&gt;</span></div>
                </b-col>
            </b-row>
            <b-row class="mb-5">
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>7</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>8</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>9</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle operation" @click="operationClickHandler"><span>?</span></div>
                </b-col>
            </b-row>
            <b-row class="mb-5">
                <b-col xs="3" class="text-center">
                    <div class="circle none"><span>-1</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle number" @click="numberClickHandler"><span>0</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle none"><span>-1</span></div>
                </b-col>
                <b-col xs="3" class="text-center">
                    <div class="circle operation" @click="operationClickHandler"><span>=</span></div>
                </b-col>
            </b-row>
        </div>
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
        },
        numberClickHandler(item){
            this.userAnswer += 
        },
        operationClickHandler(item){

        }
    }
}
</script>

<style>
    .calculator-container{
        width: 360px;
        margin: 0 auto;
    }
    .circle{
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin: 0 auto;

        position: relative;
        box-shadow: 0px 5px 7px #838383;
        cursor: pointer;
    }
    .number{
        background: #FF7043;
    }
    .number:hover{
        background: rgb(243, 90, 44);
    }
    .operation{
        background: rgb(122, 122, 122);
    }
    .operation:hover{
        background: rgb(98, 98, 98);
    }
    .circle > span{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 20px;
        font-weight: bold;
    }
    .none{
        opacity: 0;
        cursor: default;
    }
</style>