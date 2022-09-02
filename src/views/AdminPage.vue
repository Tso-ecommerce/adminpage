<template>
  <div class="container-fluid">
    <Navbar></Navbar>
    <Product></Product>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Navbar from "../components/Navbar.vue"
import Product from "../components/Product.vue"
import getUser from "../composable/getUser"

export default {
  components:{ Navbar , Product},
  setup(){
    let {user} = getUser();
    let router = useRouter();
    watch(user,()=>{
      if(!user.value){
        router.push("/")
      }

    })
  }
}
</script>

<style scoped>

  button{
    padding: 5px 10px;
    border-radius: 5px;
  }

  button:active{
    transform: scale(0.9);
  }
</style>