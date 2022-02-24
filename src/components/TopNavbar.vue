<template>
  <div>
    <nav
      class="navbar navbar-expand-md navbar-light"
      id="nav"
      :class="{ sticky: active }"
    >
      <div class="container">
        <div class="container d-flex justify-content-between">
          <div>
            <a>
              <router-link :to="{ name: 'home' }">
                <img
                  class="lefterlogo"
                  src="../assets/food.svg"
                  width="30rem"
                  height="40rem"
                  alt="FasEat Private Limited Logo"
                />
              </router-link>
            </a>
          </div>
          <div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon shifter"></span>
            </button>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav navbar-center">
            
            <li class="nav-item space">
              <router-link class="nav-link"  :to="{ name: 'login' }"  exact
                >LOGIN</router-link
              >
            </li>
            

            <li class="nav-item dropdown space">
              <router-link class="nav-link" :to="{ name: 'services' }"
                >SERVICES</router-link
              >
            </li>
            <li class="nav-item space">
              <router-link class="nav-link" :to="{ name: 'contact' }" exact
                >CONTACT</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      active: false,
      active2: false,
    };
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.getElementById("nav");
      let navBar2 = document.getElementById("nav2");
      if (window.scrollY > navBar.offsetTop) {
        this.active = true;
      } else {
        this.active = false;
      }
      if (window.scrollY > navBar2.offsetTop) {
        this.active2 = true;
      } else {
        this.active2 = false;
      }
    };
  },

  watch: {
    $route() {
      $("#navbarSupportedContent").removeClass("show");
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  max-width: 100%;
}

#nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
  background-image: linear-gradient(coral, gold);
  z-index: 100;
}

#nav.sticky {
  transition: 150ms;
  box-shadow: 0px 15px 10px -15px #111;
  background-image: linear-gradient(coral, gold) !important;
  position: fixed !important;
  top: 0;
  opacity: 1 !important;
}

#nav2 {
  background-color: #fff;
}

#nav2.sticky2 {
  background-image: linear-gradient(red, yellow) !important;
  opacity: 1 !important;
}

.navbar-default .navbar-nav > li > a {
  color: #000;
}

.navbar-nav.navbar-center {
  position: absolute;
  right: 5%;
}

.logo {
  width: 20%;
  height: 100%;
}

.space {
  padding-right: 2vw;
  font-weight: 600;
  font-size: 20px;
}

.nav-link:hover {
  color: #51b4b6 !important;
}

.active {
  color: #51b4b6 !important;
}

.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: black;
}

.cde {
  color: white !important;
  font-size: 14px !important;
  font-weight: 400px !important;
  text-decoration: none;
}

@media only screen and (max-width: 992px) {
  .logo {
    width: 15%;
  }

  .space {
    text-align: center;
    padding-right: 0;
    font-weight: 400;
    font-size: 16px;
  }
}

@media only screen and (max-width: 767px) {
  /* .container{
    display: flex;
    flex-wrap: inherit;
    align-items: flex-end !important;
    justify-content: flex-end !important;
  } */
  .logo {
    width: 20%;
  }
  .space {
    text-align: center;
    padding-right: 0;
    font-weight: 400;
    font-size: 16px;
  }

  .navbar {
    position: static;
  }

  .nav {
    padding: 0 !important;
  }

  .navbar-nav.navbar-center {
    position: static;
    left: none;
    transform: none;
  }
}

@media only screen and (max-width: 550px) {
  .logo {
    width: 25%;
  }

  .space {
    text-align: center;
    padding-right: 0;
    font-weight: 400;
    font-size: 16px;
  }
}

@media only screen and (max-width: 400px) {
  .logo {
    width: 30%;
  }

  .space {
    text-align: center;
    padding-right: 0;
    font-weight: 400;
    font-size: 16px;
  }
}

@media only screen and (max-width: 300px) {
  .logo {
    width: 35%;
  }

  .space {
    text-align: center;
    padding-right: 0;
    font-weight: 400;
    font-size: 16px;
  }
}
</style>
