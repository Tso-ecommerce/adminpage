import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

let products = ref([]);

let getProduct = () => {
  return { load, products };
};

let load = async (Col) => {
  let res = await getDocs(collection(db, Col));
  // console.log(res.docs);
  products.value = res.docs.map((doc) => {
    // console.log(doc.data());
    return { id: doc.id, ...doc.data() };
  });
};

export default getProduct;
