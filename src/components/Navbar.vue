<template>
  <nav v-if="user">
    <div>
        <p>Hi {{user.displayName}}</p>
        <p class="email">Login as {{user.email}}</p>
    </div>
    <button @click="logout">Logout</button>
  </nav>
</template>

<script>
import {signOut,onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase/config";
import { ref } from "@vue/reactivity";
import getUser from "../composable/getUser";
export default {
    setup(){
        
        let logout=async()=>{
           await signOut(auth);
           console.log("user log out");
        }

        let {user} = getUser();

        

        return {logout,user};
    }
    
}
</script>

<style>
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
        color: beige;
        font-weight: bold;

    }

    nav p.email{
        font-size: 14px;
        color:#999;
    }
</style>