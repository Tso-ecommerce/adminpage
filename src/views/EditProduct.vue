<template>
    <div class="container mt-3 d-flex justify-content-center align-items-center flex-column">
            <h3 class="productName">Edit Product {{name}}</h3>
         <form class="forms" @submit.prevent="updateProduct" v-if="id">
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                        <div class="input-group" v-show="!addcat">
                            <select class="form-select" v-model="category" required>
                                <option v-for="tag in tags" :key="tag" v-bind:value="tag">{{tag}}</option>
                            </select>
                            <button class="categoryBtn" type="button" @click="addcat=!addcat"> + </button>
                        </div>

                        <div class="input-group" v-show="addcat">
                            <input type="text" class="form-control" id="category" placeholder="Product category"  v-model="category" required>
                            <button class="categoryBtn" type="button" @click="addcat=!addcat"> - </button>
                        </div>
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
                    <input class="form-check-input" type="checkbox" role="switch" id="avaliable" v-model="avaliable" @click="avaliable=!avaliable">
                    <label class="form-check-label text-dark" for="avaliable">
                        Avaliable
                    </label>
                </div>

                <button class="my-3 save">Save</button>
        </form>

        <div v-else class="loading">
            <div class="spinner-grow text-primary"></div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import {db} from "../firebase/config"
import {doc,getDoc} from "firebase/firestore"
import{collection,setDoc} from "firebase/firestore"
import { useRouter } from 'vue-router';
import getProduct from "../composable/getProduct";
export default { 
    props:["id"],
    setup(props){
        let category=ref("");
        let name=ref("");
        let image=ref("");
        let price=ref("");
        let unit=ref("");
        let router=useRouter();
        let avaliable = ref();
        let tags = ref([]);
        let addcat = ref(false);

        let {load,products} = getProduct();
        load();
        // console.log(products.value);

        products.value.forEach((product)=>{
            // console.log(product.category);
        tags.value.push(product.category)
            
        })
        

        let get=async()=>{
            try{
                let res = await getDoc(doc(db,"Product",props.id));
                if(res){
                    let res = await getDoc(doc(db,"Product",props.id));
                    // console.log(res.data());

                    category.value = res.data().category
                    name.value = res.data().name
                    image.value = res.data().image
                    price.value = res.data().price
                    unit.value = res.data().unit
                    avaliable.value = res.data().avaliable
                }else{
                    throw new Error("No Product")
                }
            }catch(err){
                err.message = err.value
            }
        }

        get();



        let updateProduct = async()=>{
           let ProductForm={
                category:category.value,
                name:name.value,
                image:image.value,
                price:price.value,
                unit:unit.value,
                avaliable:avaliable.value
            }

            // console.log(ProductForm);

            let newres=await setDoc(doc(db,"Product",props.id),ProductForm)

            router.push({name:"Admin"})



        }

        return{tags,addcat,updateProduct,category,name,image,price,avaliable,unit}
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