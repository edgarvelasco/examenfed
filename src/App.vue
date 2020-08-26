<template  >

  <div id="app " class="fondo bg-cover " >
    <div id="nav" >
      <Navbar/>

    </div>
    <router-view class="container mx-auto"/>
  </div>
</template>

<style>
@import 'css/Tailwind.css';

.fondo{
    background-image: url('https://firebasestorage.googleapis.com/v0/b/mystic-sun-151807.appspot.com/o/bg1.jpg?alt=media&token=fd252fcc-9a19-4b46-9201-46574b623315')
}
</style>


<script>

import Navbar from '@/components/Navbar'
export default {

  components:{
    Navbar
  }
  
}
</script>