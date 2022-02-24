
<template>
  <div class="vue-tempalte">
    <TopNavbar></TopNavbar>
      <div
        class="card mx-auto shadow-lg p-3 mb-5 bg-white rounded"
        style="width: 60rem"
      >
        <div class="card-body">
          <div class="register">
            <div class="clr">
              <h1>Sign-Up Form</h1>
              <hr />
            </div>
            
            <form method="POST" @submit.prevent="submit">
              <label for="CustomerId">CustomerId: </label><br />
              <input
                type="text"
                name="CustomerId"
                v-model.trim="$v.CustomerId.$model"
                placeholder="Your Customer ID"
              />
              
              <div class="error" v-if="!$v.CustomerId.required">
                Field is required
              </div>
              <br />
              <br />

              <label for="fname">First Name: </label><br />
              <input
                type="text"
                name="fname"
                v-model.trim="$v.fname.$model"
                placeholder="Your First Name"
              />
              <div class="error" v-if="!$v.fname.required">
                Field is required
              </div>
              <br />
              <div class="error" v-if="!$v.fname.alpha">Only Characters</div>
              <br />

              <label for="lname">Last Name: </label><br />
              <input
                type="text"
                name="lname"
                v-model.trim="$v.lname.$model"
                placeholder="Your Last name"
              />
              <div class="error" v-if="!$v.lname.required">
                Field is required
              </div>
              <br />
              <br />

              <label for="phone_no">Mobile Number: </label><br />
              <input
                type="number"
                name="phone_no"
                v-model.trim="$v.phone_no.$model"
                placeholder="Your mobile number"
              />
              <div class="error" v-if="!$v.phone_no.required">
                Field is required
              </div>
              <br />
              <br />

              <label for="email">Email: </label><br />
              <input
                type="email"
                name="email"
                v-model.trim="$v.email.$model"
                placeholder="Enter your Email"
              />
              <div class="error" v-if="!$v.email.required">
                Field is required
              </div>
              <div class="error" v-if="!$v.email.email">
                Enter valid email address
              </div>
              <br />
              <br />

              <label for="password">Password: </label><br />
              <input
                type="password"
                name="password"
                v-model.trim="$v.password.$model"
                placeholder="Enter your Password"
              />
              <div class="error" v-if="!$v.password.required">
                Field is required
              </div>
              <div class="error" v-if="!$v.password.valid">
                Minimum Length of password should be 8 and contain atleast 1
                Upercase, 1 lowercase and 1 special character
              </div>
              <br />
              <br />
              <a href="/login">
                <button
                  class="button ton"
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                >
                  Submit!
                </button>
              </a>
              <p class="typo__p" v-if="submitStatus === 'OK'">
                Thanks for your submission!
              </p>
              <p class="typo__p" v-if="submitStatus === 'ERROR'">
                Please fill the form correctly.
              </p>
              <p class="typo__p" v-if="submitStatus === 'PENDING'">
                Sending...
              </p>
            </form>
          </div>
        </div>
      </div>

    <br />
    <br />
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import {
  required,
  alpha,
  numeric,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import TopNavbar from "./TopNavbar.vue";
import Footer from "./Footer.vue";

export default {
  devServer: {
    proxy: "http://localhost:3000",
  },
  components: {
    TopNavbar,
    Footer,
  },
  data() {
    return {
      CustomerId: "",
      fname: "",
      lname: "",
      phone_no: "",
      email: "",
      password: "",
      submitStatus: "",
    };
  },
  methods: {
    async submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          url: "http://localhost:3000/customer/addCustomer",
          data: {
            CustomerId: this.CustomerId,
            fname: this.fname,
            lname: this.lname,
            phone_no: this.phone_no,
            email: this.email,
            password: this.password,
          },
        };
        const data = await axios.request(options);

        console.log(data);
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 5000);
      }
    },
  },
  validations: {
    CustomerId: {
      required,
    },
    fname: {
      required,
      alpha,
    },
    lname: {
      required,
      alpha,
    },
    phone_no: {
      required,
      numeric,
      maxLength: maxLength(10),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecial
        );
      },
    },
  },
};
</script>
<style scoped>
.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}
.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}
.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
.error {
  color: red;
}
input {
  background-color: rgb(212, 212, 212);
  border-radius: 2rem;
}
.card {
  border-radius: 2rem;
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  background-color: aliceblue;
  z-index: 5;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("");
}
.ton {
  background-image: linear-gradient(coral, gold);
  border-radius: 2rem;
}
.vue-tempalte {
  background: url("../assets/fud.jpg");
}
.card.mx-auto.shadow-lg.p-3.mb-5.bg-white.rounded {
    margin-top: 5rem;
}
</style>