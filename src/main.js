import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import HomeComponent from './components/HomeComponent.vue';
import ProductPage from './components/ProductPage.vue';
import CartPage from './components/CartPage.vue';
Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.config.productionTip = false

//App.use(router);
const router = new VueRouter({
  mode:"history",
  routes:[
    {path:'/login', component:LoginForm}, //our-domain/login
    {path:'/', component:RegisterForm},
    {path:'/home', component:HomeComponent},
    {path:'/products', component:ProductPage},
    {path:'/mycart',component:CartPage}
  ],
});

// console.log(router);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



