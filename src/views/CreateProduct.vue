<template>
    <div class="container my-3 d-flex justify-content-center align-items-center flex-column">
            <h3 class="productName">Create Product</h3>
            <form class="forms" @submit.prevent="addProduct">
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" class="form-control" id="category" placeholder="Product Category" v-model="category" required>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Product Name"  v-model="name" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="text" class="form-control" id="image" placeholder="Image Link"  v-model="image" required>
                    </div>

                    <div class="mb-3 d-flex justify-content-between">
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="price" placeholder="Product Price"  v-model="price" required>
                        </div>

                        <div class="mb-3">
                            <label for="unit" class="form-label">Unit</label>
                            <input type="text" class="form-control" id="price" placeholder="Product Unit"  v-model="unit" required>
                        </div>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="avaliable" checked v-model="avaliable" @click="avaliable=!avaliable">
                        <label class="form-check-label text-dark" for="avaliable">
                            Avaliable
                        </label>
                    </div>

                    <button class="my-3 save">Add Product</button>
            </form>
            <div v-if="error">
                <p>{{error}}</p>
            </div>
            <!-- <div v-else class="loading">
                <div class="spinner-grow text-primary"></div>
            </div> -->
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import {db} from "../firebase/config"
import{collection,addDoc} from "firebase/firestore"
import {useRouter} from "vue-router"
export default { 
    setup(){
        let category=ref("");
        let name=ref("");
        let image=ref("");
        let price=ref("");
        let unit=ref("");
        let avaliable = ref(true);
        let router = useRouter();
        let error = ref("");

        console.log(avaliable.value);

        let addProduct = async()=>{
           let ProductForm={
                category:category.value,
                name:name.value,
                image:image.value,
                price:price.value,
                unit:unit.value,
                avaliable:avaliable.value
            }

            // console.log(ProductForm);

            try{
                let res=await addDoc(collection(db,"Product"),ProductForm)

                if(res){
                    router.push({name:"Admin"})
                }else{
                    throw new Error("Cant Create")
                }
            }catch(err){
                error.value = err.message
            }

            


            // console.log(res);


        }

        return{addProduct,category,name,image,price,avaliable,unit,error}
    }
}
</script>

<style scoped>
    .forms{
        padding: 20px 40px;
        /* width: 50%; */
        margin: auto;
        background: rgba(179, 172, 170, 0.2);
        border-radius: 20px;
        border: 2px solid orange;
    }

    label{
        color: orangered;
    }

    .save{
        width: 100%;
        padding: 10px 0;
        border-radius: 5px;
        margin: auto;
        background-color: orange;
        border:none
    }

    .save:active{
        transform: scale(0.98);
    }

    .loading{
        /* background: red; */
        height: 90vh;
        display:flex;
        align-items: center;
    }
</style>