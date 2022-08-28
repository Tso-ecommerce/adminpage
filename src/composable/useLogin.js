import { ref } from "vue";
import { auth, signInWithEmailAndPassword } from "../firebase/config";

let error = ref("");

let Login = async (email, password) => {
  try {
    let res = await signInWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Can't Login");
    }
    return res;
  } catch (err) {
    error.value = err.message;
    // console.log(error.value);
  }
};

let userLogin = () => {
  return { error, Login };
};

export default userLogin;
