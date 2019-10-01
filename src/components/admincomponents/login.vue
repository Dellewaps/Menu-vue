<template>
  <div class="container">
    <div class="banner" id="banner">banner ffs</div> 
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
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
                <button type="button" @click="loginPost()">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Axios from "axios";
export default {
  name: "login",
  components: {},
  data() {
    return {
        username: '',
        password: '',
        loggedIn: false
    }
  },
  
  methods: {    
    // Dette er hvor POST bilver lavet for at logge ind
    loginPost() {
      if (this.username != "" && this.password != "") {
        
        const formData = new FormData();

        formData.append('name', this.username)
        formData.append('password', this.password)

        Axios.post("http://menustanderapi.test:8000/endpoints/login.php", 
      formData, 
      {        
        headers: {
          'Content-Type': 'multipart/form-data'        
        }
      }, "json") .then(response => {
        this.login = response.data;
        if(response.data.result ==  1){
          this.loggedIn = true;
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('password', this.username);
          sessionStorage.setItem('loggedIn', this.loggedIn);
          this.$router.push('/admincomponents/admin')
          //window.location.href = '/admincomponents/admin';
        }else{
        document.getElementById("banner").style.backgroundColor = "red";
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "Brugernavn og kodeord passer ikke sammen";
        }
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