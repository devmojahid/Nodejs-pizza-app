import axios from "axios";
import Noty from "noty";


let addTOCart = document.querySelectorAll('.add-to-cart');

let cartCounter = document.querySelector('#cartCounter');
function updateCart(pizza){
    axios.post("/update-cart",pizza).then(res=>{
        new Noty({
            text: "pizza added",
            type:"success",
            timeout:1000

          }).show();
        cartCounter.innerText = res.data.totalQty
    })
    .catch(err=>{
        new Noty({
            text: "Somthing eror added",
            type:"error",
            timeout:1000

          }).show();
    })
}

addTOCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
})