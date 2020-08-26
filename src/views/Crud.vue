<template>
    <div class="mt-10 shadow-2xl bg-white"  > 
        <div><h1 class="text-center text-5xl">Panel de control</h1></div>
        <hr> 
        <div class="flex flex items-center mt-2 ">
            
            <div class="max-w-sm ml-24 shadow-2xl">
                <div v-if="cargaPage"  class=" border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal bg-orange-500">
                    <div class="mb-1"  >
                        <div >
                            <h2 class="text-lg text-white flex items-center">
                                Número de publicaciones
                            </h2>
                            <div class="text-gray-900 font-bold text-xl  flex flex-no-wrap justify-center mt-3">
                                <h3 class="text-3xl text-white">{{totalRegistro}}</h3>
                                <svg class="w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <div class="ml-auto  pr-32" @mouseout="isHiddenAdd=true" @mouseover="isHiddenAdd=false" >
                <router-link   to="/Create" class="shadow rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded inline-flex items-center transition duration-500 ease-in-out transform hover:rotate-180 ">
                    <svg  viewBox="0 0 20 20" fill="currentColor" class="user-add w-10 h-10 transition duration-500 ease-in-out transform " :class="{'rotate-180' : !isHiddenAdd}"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                    <span class="transition duration-500 ease-in-out transform"  :class="{ 'rotate-180' : !isHiddenAdd,'hidden' : isHiddenAdd}">Agregar</span>
                </router-link>
            </div> 
            
        </div>

        <hr>

        <div v-if="!cargaPage" class="justify-center">
            <carga></carga>
        </div>

        <div v-if="cargaPage" class="flex flex-wrap mt-10  justify-center">
            
            <div v-for="(item, index, n) in publicaciones" :key="index" class="mr-5 mb-5  lg:w-1/5  w-full  shadow-2xl  border-8 hover:border-green-300  transform hover:-translate-y-1 hover:scale-105" >
                <transition name="slide-fade">
                <div class="max-w-sm rounded overflow-hidden shadow-lg " v-if="!show[n]">

                    <router-link :to="{name:'preview',params:{id: index}}">
                        <div class="bg-cover bg-center h-40" :style="{backgroundImage:`url(${item.url})`}">
                        </div>
                    <div class="px-6 py-2 bg-black">
                        <div class="text-white font-bold text-2xl mb-2 text-center">{{item.titulo}}</div>
                    </div>
                    <div class="px-6 h-40 bg-white overflow-auto">
                        <p class="text-gray-700 text-lg">
                            {{item.contenido}}
                        </p>
                    </div>
                    <div class="px-6 py-4 bg-white  h-10">
                        <p class="text-gray-700 text-sm">
                            - {{item.autor}}
                        </p>
                    </div>
                    </router-link>
                                            
                            <div class="flex flex-no-wrap justify-center w-full bg-black">
            
                                <div class=" m-1" @mouseout="isHiddenModify[n]=true" @mouseover="isHiddenModify[n]=false">
                                    <router-link  :to="{name:'edit',params:{id: index}}" class="transition duration-100 ease-in-out block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transform hover:-translate-y-1 hover:scale-100 mr-10">
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-5 h-5 mr-1"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>                            
                                        <span  :class="{'hidden' : isHiddenModify[n]}" >Modificar</span>
                                    </router-link>    
                                </div>
                                <div class="m-1"  @mouseout="isHiddenDelete[n]=true" @mouseover="isHiddenDelete[n]=false">
                                    <button @click="toggleModal[n] = !toggleModal[n]" class="transition duration-100 ease-in-out bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transform hover:-translate-y-1 hover:scale-100">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="user-remove w-5 h-5 mr-1"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>                            
                                    <span  :class="{'hidden' : isHiddenDelete[n]}">Eliminar</span>
                                    </button>  


                                </div>

                                    <div v-if="toggleModal[n]" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
                                        <div class="relative mx-auto w-auti max-w-2xl">
                                            <div class="bg-white w-full rounded shadow-2xl flex flex-col">
                                                <div class="text-2xl font-bold text-center m-5">
                                                    Estás intentando borrar un registro
                                                </div>
                                                <div class="text-center m-1">
                                                <span> ¿Quieres eliminar permanentemente el registro?</span>
                                                
                                                </div>
                                                <div class="flex flex-no-wrap">
                                                    <button @click="show[n] = true,deletePublicacion(index),toggleModal[n]=false" type="submit" class="rounded bg-red-500 hover:bg-red-600 text-white px-6 mt-1 py-2 w-4/12 m-auto mb-3 mt-3 inline-flex items-center"  >
                                                        <svg viewBox="0 0 20 20" fill="currentColor" class="user-remove w-6 h-6 mr-1"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>                            
                                                        <span class="">Eliminar</span>
                                                        
                                                    </button>
                                                    <button class="rounded bg-transparent hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-6 mt-1 py-2 w-4/12 m-auto mb-3 mt-3 inline-flex items-center" @click="toggleModal[n]=false" >
                                                        <svg viewBox="0 0 20 20" fill="currentColor" class="x-circle w-6 h-6"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                                        <span> Cancelar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div v-if="toggleModal[n]" class="absolute z-40 inset-0 z-40 opacity-25 bg-black">
                                </div>
                                
                            </div>

                </div>
                </transition>
            </div>
            
        </div>

    </div>
</template>


<script>
import axios from 'axios'
import carga from '@/components/carga'
export default {
    name: "modal",
    data() {
        return {
            
            toggleModal: [],
            isHiddenAdd:true,
            isHiddenModify:[],
            isHiddenDelete: [],
            publicaciones:[],
           
            autor:'',
            titulo:'',
            contenido:'',
            id:'',
            url:'',
            show:[],
            cargaPage: false,
            ultimoRegistro:[],
            totalRegistro:0,
            
            
        }
    },
    async mounted() {
        const respose = await axios.get('http://localhost:8080/posts')
        
        this.cargaPage=true;
        
        this.publicaciones = respose.data.posts
        
        
       var contador=0;
        for (let num in respose.data.posts) {
            this.isHiddenModify[contador]= true;
            this.isHiddenDelete[contador]=true;
            contador++;        
            console.log(num)
        }
        this.totalRegistro=contador;
        
    },
    async beforeUpdate() {
        const respose = await axios.get('http://localhost:8080/posts')
        
      
        this.publicaciones = respose.data.posts


    },
    
    methods: {
        async deletePublicacion(idPublicacion){

            await this.sleep(1000);   
            this.show=[];    
            this.isHiddenModify=[];
            this.isHiddenDelete=[];

            var contador=0;
            for (var num in this.publicaciones) {
                this.isHiddenModify[contador]= true;
                this.isHiddenDelete[contador]= true;
                console.log(num);
                contador++;        
            }
            this.totalRegistro--;

            await axios.delete('http://localhost:8080/posts/'+ idPublicacion )
            console.log('Registro eliminado')
          

        },
        sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
        },
    },
 
    components:{
        carga
    }

}
</script>
  

 <style scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateX(10px);
  opacity: 0;
}

 </style>