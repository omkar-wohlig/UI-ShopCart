<template>
  <div>
    <h3>My Cart Page</h3><br>
    <a href="/"><button>Logout </button></a>
    <br>
    <h3>My Cart </h3><br>
    <h4>All Products in cart for CustomerID - {{customer}}</h4>

    <b>Cart Value : {{products.cartValue}}</b>
    <ul>
        <li v-for="product in products.products" :key="product">
           <div class="card">
            <p>Product ID: {{product.ProductId}}</p>
            <p>Product Name: {{product.name}}</p>
            <p>Product Price: {{product.price}}</p>
            <button v-on:click="deleteProduct(product.ProductId)"> Delete Product </button>
           <br><br></div><br>
        </li><br>
    </ul>
    <br><br>
    <a href="/products"> <button> Go to Products </button></a>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
    return {
      products:'',
      customer:localStorage.getItem("CustomerId")
    };
  },
  methods:{

      async deleteProduct(pID){
          await axios.delete("http://localhost:3000/cart/deleteProduct/"+pID+"/"+localStorage.getItem("CustomerId"))
          .then((response)=>{
              alert("Product got deleted successfully")
              console.log("Delete successfull"+response)
              this.getCart()
          })
           .catch(err =>{
            console.error("Error "+ err);
        })

      },
      async getCart(){
          await axios.get("http://localhost:3000/cart/getAllProducts/"+localStorage.getItem("CustomerId"))
          .then((response)=>{
              console.log(response.data[0]);
              this.products = response.data[0]
          })
          .catch(err =>{
            console.error("Error "+ err);
        })
      }
  },
  beforeMount(){
      this.getCart()
  }
}
</script>
<style>
.card{
    border: 1px solid black;
}
</style>