import Vue from 'vue'
import VueRouter from 'vue-router'
import Crud from '../views/Crud.vue'
import Create from '../views/Create.vue'
import Preview from '../views/Preview.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/dashboard',
    name: 'crud',
    component: Crud,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: Preview,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    meta:{
      requiresAuth: true
    }
   
  },
  {
    path: '/',
    name: 'login',
    component: Login,
   
  },
 
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) =>{
  if(to.matched.some(ruta => ruta.meta.requiresAuth)){
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    }else{
      next({
        name:'login'
      })
    }
  }else{
    next();
  }
})

export default router
