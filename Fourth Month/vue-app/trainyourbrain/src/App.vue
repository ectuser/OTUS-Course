<template>
	<div id="app">
		<b-container fluid="xl">
			<b-row>
				<b-col lg="6">
					<Settings />
				</b-col>
				<b-col lg="6">1 of 2</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Settings from './components/Settings'

export default {
	name: 'App',
	components: {
		Settings
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
