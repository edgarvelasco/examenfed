<template>
    <div class="w-full h-screen max-w-xs mt-24  ">
    <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <h1 class="text-2xl text-center mb-10">Administrador de publicaciones</h1>
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Correo
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuario">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Contraseña
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        
        </div>
        <div class="flex items-center justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Iniciar sesión
        </button>

        </div>
    </form>


    <div v-if="error" role="alert">
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    Error
  </div>
  <div  class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{{error}}</p>
  </div>
</div>

    </div>


</template>

<script>

import firebase from 'firebase'

export default {
    data(){
        return{
            
            email:'',
            password:'',
            error:''
        }
    },
    name: 'Login',
    methods:{
        login(){
            this.error='';
            if ( this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(user)
                    this.$router.push({name: 'crud'})
                }).catch(err => {
                    this.error = err.message
                })
            }else{
                this.error = 'Todos los campos son requeridos';
            }
        }
    }
}
</script>