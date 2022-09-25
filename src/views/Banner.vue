<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-inner">
            <div class="carousel-item active bannerimgs" v-for="banner in products" :key="banner.id">
            <img :src="banner.image" class="w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="addcards p-2">
                    <!-- Button trigger modal -->
                    <button type="button" class="addbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        <p>Add Banner Image</p>
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-dark">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" v-model="image">
                                    <label for="floatingInput">Image Link</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btns btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btns btn-primary" @click="addProduct">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="info my-2">
                    <p class="num">{{products.length}}</p>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import getProduct from '@/composable/getProduct';    
import { ref } from '@vue/reactivity';
import {db} from "../firebase/config"
import{collection,addDoc} from "firebase/firestore"
import { useRouter } from 'vue-router';
export default {
    setup(){
        let image = ref("");
        let error = ref("");
        let router = useRouter()
        let {load,products} = getProduct();
        load("Banners");

        let addProduct = async()=>{
           let ProductForm={
                image:image.value,
            }

            console.log(ProductForm);

            try{
                let res=await addDoc(collection(db,"Banners"),ProductForm)

                if(res){
                    router.go({name:"Banner"})
                }else{
                    throw new Error("Cant Create")
                }
            }catch(err){
                error.value = err.message
            }
        }



        console.log(products.value);

        return {products,load,image,error,addProduct};
    }
}
</script>

<style>
.carousel-inner{
    width: 90%;
    height: 60vh;
    margin: auto;

    margin-top: 20px;
    box-shadow: 0 5px 5px orangered;
 }  

.bannerimgs{
    width: 100%;
    height: inherit;   
}

.bannerimgs img{
    width: inherit;
    height: inherit;
    object-fit: cover;
   
}

.addbtn{
    width: 100%;
    height: 200px;
    background: rgb(235, 178, 66);
    border: none;

    position: relative;
}

.addbtn p{
    font-weight: bold;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
}

.info{
    width: 100%;
    height: 200px;
    background-color:rgba(216, 149, 216,0.5);
    /* opacity: 0.5; */

    position: relative;
}

.num{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 100px;
    color:orangered;
}
</style>