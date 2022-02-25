<template>
  <div>
    <form>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :counter="10"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "LoginForm",
  mixins: [validationMixin],

  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    password: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("password must be at most 10 characters long");
      !this.$v.password.required && errors.push("password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    routing() {
      if (this.submitStatus === "OK") {
        this.$router.push("/products");
      } else {
        this.$router.push("/");
      }
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    async submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          url: "http://localhost:3000/customer/login",
          data: {
            email: this.email,
            password: this.password,
          },
        };
        const data = await axios.request(options);

        localStorage.setItem("CustomerId", data.data);
        console.log(data);
        // this.submitStatus = 'PENDING'
        this.submitStatus = "OK";
        // router.push("/home");
        console.log(this.submitStatus);
      }

      console.log(this.submitStatus);

      this.routing();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */
</style>
