<template  >
<div class="shadow-2xl bg-white w-3/5 ">
    <div class="flex justify-center mt-5"><h1 class="text-5xl">Crear publicación</h1> </div>
<hr>
    <div v-if="!carga" class="flex flex-wrap ">
        <carga class="h-auto"></carga>
    </div>
    
<div v-else class="mt-5  flex justify-center items-center">
    
    <form class="w-full max-w-lg " @submit.prevent="onUpload">
    
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Imagen
        </label>
            <div >
                <input required type="file" @change="previewImage"  accept="image/*" >
            </div>
                <div v-if="banderaProgress">
                    <div class="text-center fixed overflow-visible inset-0 flex justify-center items-center z-50 w-screen h-screen">
                        <div class="w-full">
                            <p class="text-white text-5xl">Progress: {{uploadValue.toFixed()+"%"}}</p><br>
                            <progress id="progress" :value="uploadValue" max="100" class="w-full"></progress> 
                        </div>

                    </div>
                    <div  class="absolute inset-0 w-screen h-screen  opacity-75 bg-black">
                    </div>
                </div>
                <div v-if="imageData!=null">
                    <img class="preview" :src="picture">
                    <br>
            
            </div>
        </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Autor
        </label>
        <input  v-model="autor" :class="{ 'border-red-500' : validaAutor}" @focus="validaAutor=false" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="input-autor" type="text" placeholder="Ingrese nombre del autor">
        <span v-if="validaAutor" class="text-red-500 text-lg">No se ha ingresado autor</span>
        </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Título
        </label>
        <input  v-model="titulo" :class="{ 'border-red-500' : validaTitulo}" @focus="validaTitulo=false" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="input-titulo" type="text" placeholder="Ingrese título">
        <span v-if="validaTitulo" class="text-red-500 text-lg">No se ha ingresado titulo</span>
        </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Contenido
        </label>
        <textarea  v-model="contenido" :class="{ 'border-red-500' : validaContenido}" @focus="validaContenido=false" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="input-contenido" type="textarea" placeholder="Ingrese contenido" rows="6"/>
        <span v-if="validaContenido" class="text-red-500 text-lg">No se ha ingresado contenido</span>
        </div>
    </div>
    
    <div class="flex flex-wrap -mx-3 mb-6 flex justify-center items-center">
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4   rounded">
            Crear
        </button>
        <router-link to="/dashboard" class="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4   rounded">
            Cancelar
        </router-link>
    </div>    
    </form>

</div>
</div>
</template>

<script>
import firebase from 'firebase';
import carga from '@/components/carga'

import axios from 'axios'
export default {
    name: 'Upload',
    data() {
        return {
            
                autor:'',
                titulo:'',
                contenido:'',
                
                imageData: null,
                picture: null,
                uploadValue: 0,
                url:'',
                carga:false,
                banderaProgress:false,
                validaAutor:false,
                validaTitulo:false,
                validaContenido:false,
                vtotal:0
        }
    },
    methods: {
        async addPublicacion(){
            await axios.post('http://localhost:8080/posts',{
                title: this.titulo,
                author: this.autor,
                content: this.contenido,
                url: this.picture
            })
            console.log('Registro Creado');
            this.$router.push("/dashboard");
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
        },

        onUpload(){
            this.validacionTotal();
            if (this.vtotal==0) {
            if (this.imageData==null) {
                this.addPublicacion();
            }else{
                this.picture=null;
                let hoy = new Date();
                let rename = '-'+hoy.getHours()+hoy.getMinutes()+hoy.getSeconds()+hoy.getDate()+hoy.getMonth()+1+hoy.getFullYear()+Math.floor(Math.random() * Math.floor(1000))+'-';
                
                const storageRef=firebase.storage().ref(rename+`${this.imageData.name}`).put(this.imageData);
                
                storageRef.on(`state_changed`,snapshot=>{
                        this.banderaProgress=true;
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, error=>{console.log(error.message)},
                    ()=>{this.uploadValue=100;
                            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.picture =url;
                            
                            this.addPublicacion();
                            });
                        }
                );
            }
            }
        },
        validacionAutor(){
            if (this.autor=='') {
                this.validaAutor=true;
                return false
            }
            else{
                return true
            }            
        },
        validacionTitulo(){
            if (this.titulo=='') {
                this.validaTitulo=true;
                return false
            }
            else{
                return true
            }            
        },
        validacionContenido(){
            if (this.contenido=='') {
                this.validaContenido=true;
                return false
            }
            else{
                return true
            }            
        },
        validacionTotal(){
            this.vtotal=0;
            if (!this.validacionTitulo()) {
                this.vtotal++;
            }
            if (!this.validacionAutor()) {
                this.vtotal++;
            }
            if (!this.validacionContenido()) {
                this.vtotal++;
            }

            console.log(this.vtotal)
            
        }
 

    },
    mounted() {
        this.carga=true
    },
    components:{
        carga
    }

  
}
</script>

