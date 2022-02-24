<template>
  <div class="hello">
   <h1> Login Form </h1>
   <form method="POST" @submit.prevent="submit">


        <label for="email">Email: </label><br>
        <input type="email" name="email" v-model.trim="$v.email.$model" placeholder="Your Email">
        <div class="error" v-if="!$v.email.required">Field is required</div>
        <div class="error" v-if="!$v.email.email">Enter valid email address</div>
        <br>
        <br>
        
         <label for="password">Password: </label><br>
        <input type="password" name="password" v-model.trim="$v.password.$model" placeholder="Your Password">
        <div class="error" v-if="!$v.password.required">Field is required</div>
        <br>
        <br>
        <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

   </form>

    
  </div>
</template>

<script>
import { required,email} from 'vuelidate/lib/validators';
import axios from 'axios'

export default {
  name: "LoginForm",
  
  data(){

      return {
          email:'',
          password:'',
          submitStatus:''
      };

  },
  methods:{
      routing()
      {
        if(this.submitStatus==='OK')
        {
          this.$router.push('/products') 
        }
        else
        {
          this.$router.push('/')
        }
      },
      async submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        
       const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: 'http://localhost:3000/customer/login',
        data: { 
            email:this.email,
            password:this.password }
      }
      const data = await axios.request(options)

      localStorage.setItem("CustomerId",data.data)
      console.log(data)
        // this.submitStatus = 'PENDING'
        this.submitStatus = 'OK'
          // router.push("/home");
          console.log(this.submitStatus);
  
      }

      console.log(this.submitStatus);

      this.routing();
    }

  },
  validations:{
      email:{
          required,
          email
      },
      password:{
          required
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
