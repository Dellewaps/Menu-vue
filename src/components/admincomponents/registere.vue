<template>
  <div class="container">
      <div class="navbar">
        <navbar />
        <div class="banner" id="banner">banner ffs</div>
      </div>    
    <div class="row justify-content-center">
      
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Registere en bruger</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="username" class="col-md-4 col-form-label text-md-right">Brugernavn</label>
              <div class="col-md-6">
                <input
                  type="text"
                  name="username"
                  v-model="username"
                  placeholder="Brugernavn"
                />
              </div>
            </div>
            <div class="form.group row">
              <label for="password" class="col-md-4 col-form-label text-md-right">Kodeord</label>
              <div class="col-md-6">
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="Kodeord"
                />
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-md-6 offset-md-4">
                <button type="button" @click="registerePost()">Registere en bruger</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import navbar from "../navbar.vue";
import Axios from "axios";

export default {
  // Check som ser efter om man er logget ind
  beforeCreate(){
      if(!sessionStorage.getItem('loggedIn')){
        this.$router.push('/admincomponents/login');
      }
    },
  name: "registere",
  components: {
      navbar: navbar
  },
  data() {
    return {
        username: '',
        password: ''
    }
  },
  
  methods: {    
    // Dette er hvor POST bilver lavet til at registere en bruger
    registerePost() {
      if (this.username != "" && this.password != "") {
        
        const formData = new FormData();

        formData.append('name', this.username)
        formData.append('password', this.password)

        Axios.post("/endpoints/registerepost.php", 
      formData, 
      {        
        headers: {
          'Content-Type': 'multipart/form-data'        
        }
      }, "json") .then(response => {
        this.login = response.data;   
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = response.data.message;
          if (response.data.result == 1) {
            document.getElementById("banner").style.backgroundColor = "green";
          } else {
            //eslint-disable-next-line
            console.log("GAL");
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").innerHTML = "Denne bruger kan ikke oprettes";
          } 
          //eslint-disable-next-line
          console.log(response.data)
        return;
      }).catch(function () {
          //eslint-disable-next-line
          console.error('Failure!!');
        });
      }
    },
    init() {}
  },
  mounted() {}
};
</script>