'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import App from './components/App.vue';
import View from './components/View.vue';
import notfound from './components/NotFound.vue'

var firebaseConfig = {
  apiKey: "AIzaSyB6-vSRfiJo6zMXjzEy53BYXZW4UbDdmIY",
  authDomain: "write-mine.firebaseapp.com",
  databaseURL: "https://write-mine.firebaseio.com",
  projectId: "write-mine",
  storageBucket: "write-mine.appspot.com",
  messagingSenderId: "1092703032328",
  appId: "1:1092703032328:web:cd94765f940ad80e"
};

firebase.initializeApp(firebaseConfig);

Vue.use(Router);

const routes = [
  {path: '/', component:App},
  {path:'/:page', component:View},
  {path:'*', component:notfound}
]

const router = new Router({
  routes:routes,
  mode: 'history'
});

new Vue({
  el:'#app',
  router: router
});