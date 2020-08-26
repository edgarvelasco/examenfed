<template>
    <nav  class="flex items-center justify-between flex-wrap bg-blue-900 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span  v-if="user!=null" class="font-semibold text-xl tracking-tight">Administrador de publicaciones</span>
        </div>
           <a v-if="user!=null" href="#" class="block mt-4  ml-auto pl-20 text-white hover:text-white">
           {{user.email}}
            </a>
        <div class="ml-10">
        <a v-if="user!=null" href="#" @click.prevent="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0">Cerrar Sesión</a>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    
    data() {
        return {
            user: null
        }
    },
    methods:{
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'login'})
      })
    },  
    },
    created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;        
      } else {
        this.user = null;
      }
    })
  }
}
</script>