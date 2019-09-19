<template>
  <div class="container">
    <div class="navbar">
      <navbar />
    </div>
    <div class="banner" id="banner">banner ffs</div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Opret en ret</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="dishName" class="col-md-4 col-form-label text-md-right">Rettens navn:</label>
              <div class="col-md-6">
                <input class="inputbox" v-model="dish" placeholder="Rettens navn" />
              </div>
            </div>

            <div class="form-group row">
              <label for="price" class="col-md-4 col-form-label text-md-right">Pris:</label>
              <div class="col-md-6">
                <input class="inputbox" v-model.number="price" type="number" placeholder="Prisen" />
              </div>
            </div>

            <div class="form-group row">
              <label for="assories" class="col-md-4 col-form-label text-md-right">Tilbehør:</label>
              <div class="col-md-6">
                <textarea class="dailydes" v-model="accessories" placeholder="Tilbehør" />
              </div>
            </div>

            <div class="form-group row">
              <label for="image" class="col-md-4 col-form-label text-md-right">Billede:</label>
              <div class="col-md-6">
                <input type="file" accept="image/*" @change="uploadImage" id="file" />
                <img src:previewImage class="uploading-image" />
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-md-6 offset-md-4">
                <input type="button" @click="createPost()" value="Gem ret" />
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
  name: "createdish",
  components: {
    navbar: navbar
  },
  data() {
    return {
      dish: "",
      price: 0,
      accessories: "",
      selectedFile: null
    };
  },

  methods: {
    // Upload af billede
    uploadImage(event) {
      this.selectedFile = event.target.files[0];
    },
    // Dette er hvor POST bilver lavet til at gemme en Ret
    createPost() {
      if(this.dish == "" || this.price == 0 || this.accessories == "" || this.selectedFile == null)
      {
        document.getElementById("banner").style.backgroundColor = "red";
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "Alle felter skal udfyldes";
        return;
      }
      const formData = new FormData();

      formData.append("name", this.dish);
      formData.append("price", this.price);
      formData.append("accessories", this.accessories);
      formData.append("image", this.selectedFile);

      Axios.post(
        "http://menustanderapi.test:8000/endpoints/createdishpost.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        "json"
      )
        .then(response => {
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = response.data.message;
          if (response.data.result == 1) {
            document.getElementById("banner").style.backgroundColor = "green";
          } else {
            //eslint-disable-next-line
            console.log("GAL");
            document.getElementById("banner").style.backgroundColor = "red";
          }
          //eslint-disable-next-line
          console.log("Success!!");
        })
        .catch(function() {
          //eslint-disable-next-line
          console.error("Failure!!");
        });
    }
  }
};
</script>
