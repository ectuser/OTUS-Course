<template>
    <div id="game">
        <div class="calculator-container">
            <b-row class="game-window-header">
                <b-col><div class="text-left header-button cancel" @click="cancel"><span class="font-weight-bold mr-2">X</span><span>CANCEL</span></div></b-col>
                <b-col><div class="text-right header-button float-right timer">{{this.$store.getters.getLeftTimeInNiceFormat}}</div></b-col>
            </b-row>
            <h3 class="text-center">{{ this.$store.state.task.expression }}={{this.userAnswer}}</h3>
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
            <div>Score: {{ this.$store.state.correctAnswers }} / {{ this.$store.state.tasksAmount }}</div>
        </div>
    </div>
</template>

<script>
import eventBus from '../bus';
import { mapActions } from 'vuex'
export default {
    name : "GameScreen",
    data(){
        return({
            userAnswer : ""
        })
    },
    methods : {
        ...mapActions(['setSpentTime']),
        cancel(){
            eventBus.$emit('onExit');
        },
        numberClickHandler(event){
            console.log(event.target.textContent);
            this.userAnswer += event.target.textContent;
        },
        operationClickHandler(event){
            const symbol = event.target.textContent;
            if (symbol === "<"){
                this.userAnswer = this.userAnswer.slice(0, -1); 
            }
            else if (symbol == ">"){
                console.log("Help")
            }
            else if (symbol == "?"){
                console.log("Help")
            }
            else if (symbol === "="){

                this.sendAnswer();
            }
            else{
                throw new Error("Can't define operation");
            }
        },
        sendAnswer(){
            eventBus.$emit('onAnswer', parseInt(this.userAnswer, 10));
            this.userAnswer = "";
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
    /* .number{
        background: rgb(243, 90, 44);
    } */
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
    .game-window-header{
        color: #C0C0C0;
    }
    .cancel, .timer{
        box-shadow: 0px 4px 4px #cfcbcb;
    }
    .cancel:hover{
        cursor: pointer;
        background: #f0f0f0;
    }
    .header-button{
        width: 100px;
        padding: 10px;
    }
</style>