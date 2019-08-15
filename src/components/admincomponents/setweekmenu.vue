<template>
  <div class="page" data-name="ugemenu" :beforein="init()">
    <div class="container" id="selectmodel">
      <div class="navbar">
        <navbar/>
      </div>
      <div class="content">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card" :bind="dishes">
              <div class="card-header">Set dagens menu</div>
              <div class="form-group row">
                <label for="monday" class="col-md-4 col-form-label text-md-right">Mandag</label>
                <div class="col-md-6">
                  <select v-model="monday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="dish in dishes"
                      :value="dish"
                      :key="dish.id"
                    >{{dish.name}} {{dish.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="tuesday" class="col-md-4 col-form-label text-md-right">Tirsdag</label>

                <div class="col-md-6">
                  <select v-model="tuesday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="dish in dishes"
                      :value="dish"
                      :key="dish.id"
                    >{{dish.name}} {{dish.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="wednesday" class="col-md-4 col-form-label text-md-right">Onsdag</label>

                <div class="col-md-6">
                  <select v-model="wednesday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="dish in dishes"
                      :value="dish"
                      :key="dish.id"
                    >{{dish.name}} {{dish.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="thursday" class="col-md-4 col-form-label text-md-right">Torsdag</label>

                <div class="col-md-6">
                  <select v-model="thursday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="dish in dishes"
                      :value="dish"
                      :key="dish.id"
                    >{{dish.name}} {{dish.description}}</option>
                  </select>
                </div>
                <label for="firday" class="col-md-4 col-form-label text-md-right">Fredag</label>

                <div class="col-md-6">
                  <select v-model="friday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="dish in dishes"
                      :value="dish"
                      :key="dish.id"
                    >{{dish.name}} {{dish.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <input type="button" @click="createPost()" value="Gem dagens menu">
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
  name: "setweekmenu",
  components: {
    navbar: navbar
  },
  data() {
    return {
      dishes: [],
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      selectedmonday: 0,
      selectedtuesday: 0,
      selectedwednesday: 0,
      selectedthursday: 0,
      selectedfriday: 0,
      
    };
  },
  methods: {
    onChange() {
      this.selectedmonday = this.monday.ID;
      //eslint-disable-next-line
      console.log(this.selectedmonday);

      this.selectedtuesday = this.tuesday.ID;
      //eslint-disable-next-line
      console.log(this.selectedtusday);

      this.selectedwednesday = this.wednesday.ID;
      //eslint-disable-next-line
      console.log(this.selectedwednesday);

      this.selectedthursday = this.thursday.ID;
      //eslint-disable-next-line
      console.log(this.selectedthursday);

      this.selectedfriday = this.friday.ID;
      //eslint-disable-next-line
      console.log(this.selectedfriday);
    },
    createPost() {
      const formData = new FormData();

      formData.append('monday', this.selectedmonday)
      formData.append('tuesday', this.selectedtuesday)
      formData.append('wednesday', this.selectedwednesday)
      formData.append('thursday', this.selectedthursday)
      formData.append('friday', this.selectedfriday)

      Axios.post("http://menustanderapi.test:8000/endpoints/setweekpost.php", 
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
    },

    init() {
      Axios({
        method: "get",
        url: "http://menustanderapi.test:8000/endpoints/ugensmenu.php",
        headers: {
          Accept: "application/json"
        }
      }).then(response => {
        this.dishes = response.data.records;
      });
    }
  },
  mounted() {}
};
</script>