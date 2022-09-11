<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse my-3 my-md-0" id="navbarSupportedContent">
        <router-link class="p" :to="{name:'Admin'}" active-class="active">All</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-for="tag in uniquetag">
        <router-link class="p nav-item" active-class="active" :to="{name:'Tag',params:{tag}}">{{tag}}</router-link>
      </ul>
    </div>
  </div>
</nav>
    <!-- <div class="tagConatiner">
        <router-link class="p" :to="{name:'Admin'}" active-class="active">All</router-link>
         <div class="tagConatiner" v-for="tag in uniquetag">
            <router-link class="p" active-class="active" :to="{name:'Tag',params:{tag}}">{{tag}}</router-link>
        </div>
    </div> -->
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props:["products"],
    setup(props){
        let tags = ref([]);
        props.products.forEach((product)=>{
            // console.log(product.category);
            tags.value.push(product.category)
            
        })

        // console.log(tags.value);

        let uniquetag = tags.value.filter((tag,index,array)=>{
            return array.indexOf(tag) === index;
        })

        console.log(uniquetag);

        return {uniquetag}
    }
}
</script>

<style scoped>
    .tagConatiner{
        /* background: red; */
        display: inline-flex;
    }

    .tagConatiner p,.p{
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        color: orange;
        padding: 10px 20px;
        cursor: pointer;
    }

    .active{
        border-radius: 25px;
        background: orange;
        color: #fff;
    }
</style>