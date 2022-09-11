import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

let products = ref([]);
let ids = ref([]);

let load = async () => {
  let res = await getDocs(collection(db, "Product"));
  console.log(res.docs);
  products.value = res.docs.map((doc) => {
    // console.log(doc.data());
    return { id: doc.id, ...doc.data() };
  });

  // console.log(products.value);
};

let getProduct = () => {
  return { load, products };
};

export default getProduct;
