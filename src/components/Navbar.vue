<template>
  <nav v-if="user">
    <div>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">{{user.displayName}}</button>


        <div class="offcanvas offcanvas-start navContainer" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">

             <div class="sidebars">

                    <div class="p-3 borderbottoms d-flex justify-space-between">
                        <p class="">{{user.displayName}}</p>
                         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <ul class="navbar-nav flex-column mt-4">
                        <router-link class="nav-link" active-class="active" :to="{name:'Admin'}">Product</router-link>
                        <router-link class="nav-link" active-class="active" :to="{name:'Create'}">Create Product</router-link>
                        <router-link class="nav-link" active-class="active" :to="{name:'Banner'}">Banner</router-link>
                        
                    </ul>

            </div>

            <button class="logout" @click="logout">Logout</button>
        </div>
    </div>

    <div v-if="products.length" class="FilterTag">
            <TagCloud :products="products"></TagCloud>
    </div>
    
  </nav>
</template>

<script>
import TagCloud from "../components/TagCloud.vue"
import {signOut,onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase/config";
import getUser from "../composable/getUser";
import getProduct from "../composable/getProduct"
export default {
    components:{ TagCloud },
    setup(){
        let {user} = getUser();
        let {load,products} = getProduct();
        load("Product");
        let logout=async()=>{
           try{
               await signOut(auth)
           }catch(err){
                console.log(err.message);
           }
        }

        return {logout,user,products,load};
    }
    
}
</script>

<style scoped>

    .navContainer{
        /* background: #999; */
        border-right: 5px solid orange;
        color: #000;
    }

    nav{
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav p{
        margin: 2px auto;
        font-size: 16px;
        /* color: beige; */
        font-weight: bold;

    }

    /* start sidebar */
    .sidebars{
        height: 100vh;
        color:#000;
    }

    .nav-link{
        background-color: oldlace;
        padding: 20px 40px;
    }
    /* end sidebar */

 .logout{
    padding: 20px 0;
    border:none;
    background: orange;
    border-radius: 10px;
    width: 80%;
    margin: 20px auto;
 }   

 .active{
    background-color: rgb(212, 161, 143);
    color: aliceblue;
 }
</style>