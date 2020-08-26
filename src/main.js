
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'



Vue.config.productionTip = false


firebase.initializeApp({
  apiKey: 'AIzaSyCfDRW-Usv39wClMe56OAmQMOiaHwKj95g',
  authDomain: 'mystic-sun-151807.firebaseapp.com',
  databaseURL: 'https://mystic-sun-151807.firebaseio.com',
  projectId: 'mystic-sun-151807',
  storageBucket: 'mystic-sun-151807.appspot.com',
  messagingSenderId: '746400075562',
  appId: '1:746400075562:web:5826eb8974da7da87b1853',
})


let app = null;

firebase.auth().onAuthStateChanged(() =>{
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})