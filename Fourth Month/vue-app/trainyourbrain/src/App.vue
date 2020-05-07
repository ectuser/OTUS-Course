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
			stop : true,
			inter : ""
		});
	},
	mounted(){
		eventBus.$on('onPlay', (...args) => { this.useSettings(...args) })
		eventBus.$on('onAnswer', (...args) => { this.getAnswer(...args) })
		eventBus.$on('onExit', () => { this.exit() })
	},
	methods : {
		...mapActions(['changeTask', 'increaseCorrectAnswers', 'increaseTasksAmount', 'setAllTime', 'increaseSpentTime', 'setDefaultState']),
		async getAnswer(userAnswer){
			this.increaseTasksAmount();
			let userAnswerNumber = userAnswer;
				if (this.$store.state.task.answer === userAnswerNumber){
					this.increaseCorrectAnswers();
				} 
			await this.nextTask();
		},
		exit(){
			this.setDefaultState();
			this.stop = true;
			clearInterval(this.inter);
			this.$router.push('/'); 
		},
		async useSettings(settings, selectedOperators){
			this.tick();
			this.selectedSettingsToPlay = settings;
			this.selectedOperators = selectedOperators;
			this.stop = false;
			this.setAllTime(settings.duration*60);
			await this.nextTask();
			this.$router.push('game'); 
		},
		async nextTask(){
			if (!this.stop){
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
			this.inter = setInterval(() => {
				this.increaseSpentTime();
				if (this.$store.state.allTime <= this.$store.state.spentTime && this.$store.state.allTime !== 0){
					this.stop = true;
					clearInterval(this.inter);

					let results = {results : this.$store.state.todayData.results};
					results.results.push(this.$store.state.correctAnswers / this.$store.state.tasksAmount);

					this.saveAllData(
						this.$store.state.todayData.trainingDay, 
						{correctAnswers : this.$store.state.correctAnswers, tasksAmount : this.$store.state.tasksAmount},
						results);

					this.setDefaultState();

					this.$router.push('/'); 
				}
			}, 1000)
		},
        async generateNumber(order){
            return await this.generateRandomNumber(10**order);
        },
        async generateRandomNumber(max, min = 0){
            return Math.floor(Math.random() * (max - min)) + min;
		},
		saveAllData(trainingDay, lastResultObj, results){
			localStorage.setItem('trainingDay', trainingDay);
			localStorage.setItem('lastResult', JSON.stringify(lastResultObj));
			localStorage.setItem('results', JSON.stringify(results));
		} 
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
