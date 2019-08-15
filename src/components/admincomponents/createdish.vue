<template>
  <div class="container">
    <div class="navbar">
      <navbar/>
    </div>
    <div class="banner" id="banner">banner ffs</div>
    <div class="form-group">
      <p>Rettens navn:</p>
      <input v-model="dish" placeholder="Rettens navn">
      <span class="text-danger"></span>
    </div>

    <div class="form-group">
      <p>Pris:</p>
      <input v-model.number="price" type="number" placeholder="Prisen">
      <span class="text-danger"></span>
    </div>

    <div class="form-group">
      <p>Tilbehør:</p>
      <textarea v-model="accessories" placeholder="Tilbehør"/>
      <span class="text-danger"></span>
    </div>

    <div class="form-group">
      <p>Billede:</p>
      <input type="file" accept="image/*"  @change="uploadImage" id="file">
      <img src:previewImage class="uploading-image">
      <span class="text-danger"></span>
    </div>

    <div class="form-group">
      <input type="button" @click="createPost()" value="Gem ret">
    </div>
  </div>
</template>

<script>
import navbar from "../navbar.vue";
import Axios from "axios";

export default {
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
    uploadImage(event) {
      this.selectedFile = event.target.files[0]


    },
    createPost() {
      
      const formData = new FormData();

      formData.append('name', this.dish)
      formData.append('price', this.price)
      formData.append('accessories', this.accessories)
      formData.append('image', this.selectedFile)

      Axios.post("http://menustanderapi.test:8000/endpoints/createdishpost.php", 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'        
        }
      }, "json")
        .then((response) => {
          //eslint-disable-next-line
          console.log(response.data)
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = response.data.message;
          if(response.data.result == 1){
            
            document.getElementById("banner").style.backgroundColor = "green";
            //eslint-disable-next-line
            console.log(response.data.message);
          }else{
            //eslint-disable-next-line
            console.log("GAL");
            document.getElementById("banner").style.backgroundColor = "red";
          }
          //eslint-disable-next-line
          console.log('Success!!');

        })
        .catch(function () {
          //eslint-disable-next-line
          console.error('Failure!!');
        });
    }
  }
};
</script>
