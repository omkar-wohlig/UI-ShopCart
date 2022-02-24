<template>
  <div>
    <h3>My Product Page</h3>
    <br />
    <div class="container ">
      <ul class="d-flex flex-column align-items-center">
        <li class="adjust" v-for="product in products" :key="product">
          {{ product.ProductId }}<br />
          <div class="card mx-auto">
            <div>
              <h5>Product Name : {{ product.name }}</h5>
              <hr>
              <div class="item__data d-flex flex-column align-items-center">
                <div>
                  <p>Product Description : {{ product.description }}</p>
                </div>
                <div>
                  <p>Product Price : {{ product.price }}</p>
                </div>
              
                <div>
                  <hr>
                  <button v-on:click="addProduct(product.ProductId)">
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <br /><br />
    <a href="/mycart"> <button>View My Cart</button></a>
    <a href="/"><button>Logout</button></a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: "",
    };
  },
  methods: {
    async addProduct(id) {
      console.log(id);
      const data = {
        CustomerId: localStorage.getItem("CustomerId"),
        ProductId: id,
      };
      await axios
        .post("http://localhost:3000/cart/products", data)
        .then((response) => {
          console.log(response.data);
          alert("Product added successfully to cart");
        })
        .catch((err) => {
          console.error("Error " + err);
        });
    },
    async getProducts() {
      await axios
        .get("http://localhost:3000/product/allProducts")
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((err) => {
          console.error("Error " + err);
        });
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
