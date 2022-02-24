<template>
  <div>
    <h3>My Cart Page</h3><br>
    <a href="/"><button>Logout </button></a>
    <br>
    <h3>My Cart </h3><br>
    <h4>All Products in cart for CustomerID - {{customer}}</h4>

    <b v-if="productno == 1">Cart Value : 0</b>
    <b v-else>Cart Value : {{products.cartValue}}</b>
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
      products:"",
      productno: 0,
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
              if(response.data[0] == undefined){
                this.productno = 1;
                this.products='';
              }
              else{
                this.productno = 0;
                this.products = response.data[0]
              }
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
li {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  max-width: 25rem;
  margin-bottom: 2rem !important;
}

img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.item__data {
  display: flex;
  justify-content: space-between;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  border-bottom: 2px solid #474747;
  padding: 0.25rem 0;
  width: auto;
}

button {
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}

button:hover,
button:active {
  background-color: #53001c;
  border-color: #53001c;
}
.card {
  border: 1px solid black;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>