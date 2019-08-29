<template>
  <div class="container">
    <div class="navbar">
      <navbar />
    </div>
    <div class="banner" id="banner">banner ffs</div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" :bind="sides">
          <div class="card-header">Opret en diverse ret</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="dishName" class="col-md-4 col-form-label text-md-right">Rettens navn:</label>
              <div class="col-md-6">
                <input class="inputbox" v-model="dish" placeholder="Rettens navn" />
              </div>
            </div>

            <div class="form-group row">
              <label for="Description" class="col-md-4 col-form-label text-md-right">Tilbehør:</label>
              <div class="col-md-6">
                <textarea class="dailydes" v-model="description" placeholder="Tilbehør" />
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
  name: "createsidedish",
  components: {
    navbar: navbar
  },
  data() {
    return {
      dish: "",
      description: ""
    };
  },
  methods: {
    createPost() {
      if(this.dish == "" || this.description == "")
      {
        document.getElementById("banner").style.backgroundColor = "red";
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "Alle felter skal udfyldes";
        return;
      }
      const formData = new FormData();

      formData.append("name", this.dish);
      formData.append("description", this.description);

      Axios.post(
        "http://menustanderapi.test:8000/endpoints/createsidedishpost.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        "json"
      )
        .then(response => {
          //eslint-disable-next-line
          console.log(response.data);
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = response.data.message;
          if (response.data.result == 1) {
            document.getElementById("banner").style.backgroundColor = "green";
            //eslint-disable-next-line
            console.log(response.data.message);
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
