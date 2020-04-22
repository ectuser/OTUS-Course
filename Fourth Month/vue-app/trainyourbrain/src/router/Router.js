import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Settings from '../components/Settings'
import GameScreen from '../components/GameScreen'
// import App from '../App'

const router = new VueRouter({
    routes: [
      { path: '/', component: Settings },
      { path: '/game', component: GameScreen }
    ]
})
export default router;