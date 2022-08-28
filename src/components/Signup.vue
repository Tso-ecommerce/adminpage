<template>
  <div>
        <h1>Please Signup</h1>

        <form @submit.prevent="signUp" >
             <div class="form-group"  @mouseenter="formDesign">
                <input type="text" name="name" id="name" class="" autocomplete="off" v-model="displayName" required/>
                <label for="email">Username</label>
            </div>

            <div class="form-group">
                <input type="text" name="email" id="email" class="" autocomplete="off" v-model="email" required/>
                <label for="email">Email</label>
            </div>

            <div class="form-group">
                <input type="password" name="password" id="password" class="" autocomplete="off" v-model="password" required />
                <label for="password">Password</label>
            </div>

            <div v-if="error" class="error">{{error}}</div>

            <button type="submit" class="btn">Signup</button>
        </form>


    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from "../composable/useSignup"

export default {
    setup(props,context){
        let displayName = ref("");
        let email = ref("");
        let password = ref("");
        let {error,createAccount} = useSignup();
        let signUp= async()=>{
          let res = await createAccount(displayName.value,email.value,password.value)
          if(res){
            // console.log(res.user);
            context.emit("GoToAdmin")
          }
          
        }

        let formDesign=()=>{
            const labels = document.querySelectorAll(".form-group label");
            // console.log(labels);

            labels.forEach((label) => {
            // console.log(label.innerText);
            // console.log(label.innerText.split(""));

            label.innerHTML = label.innerText
            .split("")
            .map(
                (letter, index) =>
                    `<span style="transition-delay: ${index * 50}ms">${letter}</span>`
                )
                .join("");
                });
        }

        

        return {displayName,email,password,signUp,formDesign,error};
    }
}

</script>

<style>
    
</style>