import { ref } from "vue";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase/config";

let error = ref("");

let createAccount = async (displayName, email, password) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("could't access new user");
    }
    updateProfile(auth.currentUser, {
      displayName,
    });

    return res;
  } catch (err) {
    // console.log(err.message);
    error.value = err.message;
  }
};

let useSignup = () => {
  return { error, createAccount };
};

export default useSignup;
