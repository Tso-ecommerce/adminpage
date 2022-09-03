<template>
  <div>
    <div class="containers" v-if="showLoginForm">
       <Login @GoToAdmin="GoToAdmin"></Login>
       <p class="text">Don't have an account ? <span class="text-span" @click="showLoginForm=false">Signup Now</span></p>
    </div>
    <div class="containers" v-else>
       <Signup @GoToAdmin="GoToAdmin"></Signup>
       <p class="text">Already Member ? <span @click="showLoginForm=!showLoginForm">Login</span></p>
    </div>
   
  </div>
</template>

<script>
import Signup from "../components/Signup"
import Login from "../components/Login"
import { ref } from '@vue/reactivity'
import { useRouter} from "vue-router"
export default {
  components : {Signup,Login},
  setup(){
    let showLoginForm=ref(true);
    let router = useRouter();

    let GoToAdmin=()=>{
      router.push({name:"Admin"})
    }

    return{showLoginForm,GoToAdmin}
  }
}
</script>

<style scoped>
    .containers{
      margin-top: 50px;
    }
</style>