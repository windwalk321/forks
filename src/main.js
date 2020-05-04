import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/database'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyD5Ev-NOF7xeY0TabeHzSrx3LSBBJA3Eqw',
  authDomain: 'test-9028d.firebaseapp.com',
  databaseURL: 'https://test-9028d.firebaseio.com',
  projectId: 'test-9028d',
  storageBucket: 'test-9028d.appspot.com',
  messagingSenderId: '17595996560',
  appId: '1:17595996560:web:b73df2b4ae7efbe5bf7b15'
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
