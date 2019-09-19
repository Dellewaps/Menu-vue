<template>
  <div class="page" data-name="openhours" :beforein="init()">
    <div class="container">
      <div class="navbar">
        <navbar />
        <div class="banner" id="banner">banner ffs</div>
      </div>
      <div class="content">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Set Åbnings tider</div>

              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Morgen:</label>
                  <div class="col-md-2">
                    <input type="time" v-model="morningOpen"/>
                    <span class="text-danger" ></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" v-model="morningClose"/>
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Formiddag:</label>
                  <div class="col-md-2">
                  <input type="time" v-model="beforeDinnerOpen"/>
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" v-model="beforeDinnerClose"/>
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Middag:</label>
                  <div class="col-md-2">
                  <input type="time" v-model="dinnerOpen"/>
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" v-model="dinnerClose"/>
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Eftermiddag:</label>
                  <div class="col-md-2">
                  <input type="time" v-model="afternoonOpen"/>
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" v-model="afternoonClose"/>
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div><div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <input type="button" @click="createPost()" value="Gem Åbningstider">
                </div>
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
        window.location.href = '/admincomponents/login';
      }
    },
  name: "openhours",
  components: {
    navbar: navbar
  },
  data() {
    return { 
      morningOpen: "",
      morningClose: "",
      beforeDinnerOpen: "",
      beforeDinnerClose:"",
      dinnerOpen: "",
      dinnerClose: "",
      afternoonOpen:"",
      afternoonClose:"", 
    };
  },
  methods: {
    // Dette er hvor POST bilver lavet til åbningstider
    createPost() { 
      const formData = new FormData();

      formData.append('morningOpen', this.morningOpen)
      formData.append('morningClose', this.morningClose)
      formData.append('beforeDinnerOpen', this.beforeDinnerOpen)
      formData.append('beforeDinnerClose', this.beforeDinnerClose)
      formData.append('dinnerOpen', this.dinnerOpen)
      formData.append('dinnerclosed', this.dinnerClose)
      formData.append('afternoonOpen', this.afternoonOpen)
      formData.append('afternoonClose', this.afternoonClose)

      Axios.post("http://menustanderapi.test:8000/endpoints/opentimespost.php", 
      formData, 
      {        
        headers: {
          'Content-Type': 'multipart/form-data'        
        }
      }, "json") 
        .then((response) => {
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = response.data.message;
          if(response.data.result == 1){
            document.getElementById("banner").style.backgroundColor = "green";
          }else{
            document.getElementById("banner").style.backgroundColor = "red";
          }   
        })
        .catch(function () {
          //eslint-disable-next-line
          console.error('Failure!!');
        });
    },
    init() {      
    }
  },
  mounted() {
    // Her hentes åbningstider som er gemt i databasen
    Axios({
        method: "get",
        url: "http://menustanderapi.test:8000/endpoints/opentime.php",
        headers: {
          Accept: "application/json"
        }
      }).then(response => {
        this.times = response.data.records;                
        
      });
  }
};
</script>
