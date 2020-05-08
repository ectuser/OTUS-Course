import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Settings from '../components/Settings'
import GameScreen from '../components/GameScreen'
import store from '../store/store'
// import App from '../App'

const router = new VueRouter({
    routes: [
      { path: '/', component: Settings },
      { 
        path: '/game', 
        beforeEnter(to, from, next){
          if (store.state.allTime === 0){
            next('/');
          }
          else{
            next();
          }
        },
        component: GameScreen }
    ]
})
export default router;