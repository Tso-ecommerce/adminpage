<template>
  <div>
        <h1>Please Login</h1>

        <form @submit.prevent="login" >
            <div class="form-group"  @mouseenter="formDesign">
                <input type="text" name="email" id="email" class="" autocomplete="off" v-model="email" required/>
                <label for="email">Email</label>
            </div>

            <div class="form-group">
                <input type="password" name="password" id="password" class="" autocomplete="off" v-model="password" required />
                <label for="password">Password</label>
            </div>

            <div class="error" v-if="error">{{error}}</div>

            <button type="submit" class="btn">Login</button>
        </form>


    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import userlogin from "../composable/useLogin"
export default {
    setup(props,context){
        let email = ref("");
        let password = ref("");
        let {error,Login} = userlogin();
        let login=async()=>{
            let res = await Login(email.value,password.value)
            if(res){
                console.log(res.user);
                context.emit("GoToAdmin");
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

        return {email,password,login,formDesign,error};
    }
}
</script>

<style>

</style>