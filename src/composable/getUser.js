import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

let user = ref(auth.currentUser);
onAuthStateChanged(auth, (_user) => {
  // console.log("user is", _user);
  user.value = _user;

  // console.log(user.value.displayName);
});

let getUser = () => {
  return { user };
};

export default getUser;
