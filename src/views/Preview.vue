<template >
<div class="max-w-4xl mx-auto text-center bg-white h-screen">
    
    <div class="mt-10">
    <h1 class="text-5xl ">Preview de publicación</h1>
    </div>

        <div class="w-full lg:max-w-full lg:flex mt-10">
        <div class="ml-10 h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{backgroundImage:`url(${url})`}" >
        </div>
        <div class="w-full mr-10 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">

                Preview de publicacion
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">{{titulo}}</div>
            <p class="text-gray-700 text-base">{{contenido}}</p>
            </div>
            <div class="flex items-center">
            <div class="text-sm">
                <p class="text-gray-900 leading-none">- {{autor}}</p>
                
            </div>
            </div>
        </div>
        </div>

    <div>
        <router-link to="/dashboard" class="rounded bg-blue-500 hover:bg-blue-600 text-white px-6 mt-1 py-2 w-32 m-auto mb-3 mt-3 inline-flex items-center" @click="toggleModal=false" >
            <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-circle-left w-6 h-6"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd"></path></svg>            
            <span>Regresar</span>
        </router-link>
    </div>


</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            
                autor:'',
                titulo:'',
                contenido:'',
                publicaciones:[],
                id:'',
                url:'',
                
                
        }
    },
        async mounted() {
        this.id = this.$route.params.id;
        
        console.log(this.id)
        

        const respose = await axios.get('http://localhost:8080/posts/' + this.id)
        console.log(respose)
        this.publicaciones = Object.values(respose.data)
        console.log(this.publicaciones[0].autor)
        this.autor = this.publicaciones[0].autor
        this.titulo = this.publicaciones[0].titulo
        this.contenido = this.publicaciones[0].contenido
        this.url = this.publicaciones[0].url
       
        
    },
}
</script>