<template>
  <div class="container-fluid">
    
    <div class="row" v-if="products.length">
          <div class="card col-12 col-md-6 col-lg-4 mx-auto" v-for="(product,index) in products">
            <div class="imgContainer">
              <img :src="product.image" class="card-img-top" alt="img">
            </div>
            <div class="infoContainer">
                  <div>
                    <p class="text-dark">{{product.name}}</p>
                    <small class="text-dark">1 {{product.unit}}</small>
                    <h3 class="text-info">{{product.price}} ks</h3>
                  </div>

                  <div>
                    <router-link class="btns" :to="{name:'Edit',params:{id:product.id}}">
                      <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                    </router-link>
                     <button class="btns" @click="deleteProduct(index)">
                      <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                     </button>
                  </div>
                  
            </div>
          </div>
    </div>

    <div v-else-if="error">{{error}}</div>

    <div v-else>
      <button class="btn btn-warning" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
      
  </div>
</template>

<script> 
import { ref } from '@vue/reactivity';
import getProduct from "../composable/getProduct"
import {db} from "../firebase/config"
import {doc,deleteDoc} from "firebase/firestore"
import { useRouter } from 'vue-router';
export default {
  setup(){
    
  let {load,products} = getProduct();
  let router=useRouter();
  let error = ref("")

    load();

    let deleteProduct=async (index)=>{
      try{
        await deleteDoc(doc(db,"Product",products.value[index].id))

        router.go({name:"Admin"})
      }catch(err){
          error.value = err.message
      }

    }

    return {load,products,deleteProduct,error}
  }
}
</script>

<style scoped>
  .card{
    border:none;
  }

  .imgContainer{
    border-radius: 10px;
    overflow: hidden;  
  }

  .infoContainer{
    padding: 10px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .infoContainer p{
    margin: 0;
  }

  .btns{
    width: 100px;
    height: 30px;
    border:none;
  }

  .btns:active{
    transform: scale(0.98);
  }

  .icons{
    width: 50px;
    height: 20px;
  }
</style>