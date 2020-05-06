<template>
	<div id="app">
		<router-view></router-view>
		<!-- <Settings /> -->
		<!-- <b-container fluid="xl">
			<b-row>
				<b-col lg="6">
					<Settings />
				</b-col>
				<b-col lg="6">
					<GameScreen :expression="currentTask.expression"/>
				</b-col>
			</b-row>
			<div>{{ timer }} / {{ selectedSettingsToPlay.duration * 60 }}</div>
			<div>{{ currentScore }}</div>
		</b-container> -->
	</div>
</template>

<script>
import eventBus from './bus'
import { mapActions } from 'vuex'

export default {
	name: 'App',
	data(){
		return({
			selectedSettingsToPlay : {},
			selectedOperators : [],
			currentTask : {},
			currentScore : 0,
			taskIndex : 0,
			timer : 0,
			stop : true
		});
	},
	mounted(){
		eventBus.$on('onPlay', (...args) => { this.useSettings(...args) })
		eventBus.$on('onAnswer', (...args) => { this.getAnswer(...args) })
	},
	methods : {
		...mapActions(['changeTask', 'increaseCorrectAnswers']),
		async getAnswer(userAnswer){
			let userAnswerNumber = userAnswer;
				if (this.$store.state.task.answer === userAnswerNumber){
					this.increaseCorrectAnswers();
				} 
			await this.nextTask();
		},
		async useSettings(settings, selectedOperators){
			this.tick();
			this.selectedSettingsToPlay = settings;
			this.selectedOperators = selectedOperators;
			this.stop = false;
			await this.nextTask();
			this.$router.push('game'); 
		},
		async nextTask(){
			if (!this.stop){
				this.taskIndex++;
				let newTask = await this.generateTask(this.selectedOperators, this.selectedSettingsToPlay);
				this.changeTask(newTask);
			}
		},
		async generateTask(toUseOperators, settings){
            // console.log(toUseOperators);
            let order = 1;
            let numberOfNumbers = 2;
            let task = {};
            if (settings.difficulty === 2){
                order = 1;
                numberOfNumbers = 3;
            }
            else if (settings.difficulty === 3){
                order = 2;
                numberOfNumbers = 3;
            }
            else if (settings.difficulty === 4){
                order = 3;
                numberOfNumbers = 3;
            }
            else if (settings.difficulty === 5){
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
            task.expression = strExpression;
            task.answer = eval(strExpression);
            return task;
		},
		async tick(){
			let inter = setInterval(() => {
				this.timer++;
				if (this.timer >= parseInt(this.selectedSettingsToPlay.duration) * 60){
					// this.stop = true;

					// alert("That's all");
					clearInterval(inter);
				}
			}, 1000)
		},
        async generateNumber(order){
            return await this.generateRandomNumber(10**order);
        },
        async generateRandomNumber(max, min = 0){
            return Math.floor(Math.random() * (max - min)) + min;
        }
	},
	components: {
		// Settings,
		// GameScreen
	}
}
</script>

<style>
/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
} */
</style>
