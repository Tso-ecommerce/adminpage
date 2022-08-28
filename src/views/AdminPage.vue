<template>
  <div class="container">
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
export default {
  components:{ Navbar}
}
</script>

<style>
  body{
    display: block;
  }

  .container{
    /* background: red; */
    width: 80%;
    margin: 20px auto;
  }

  button{
    padding: 5px 10px;
    border-radius: 5px;
  }

  button:active{
    transform: scale(0.9);
  }
</style>