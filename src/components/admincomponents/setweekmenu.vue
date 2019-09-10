<template>
  <div class="page" data-name="setweekmenu" :beforein="init()">
    <div class="container" id="selectmodel">
      <div class="navbar">
        <navbar />
      </div>
      <div id="banner"></div>
      <div class="content">        
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card" :bind="dishes">
              <div class="card-header">Set ugens menu</div>

              <div class="form-group row">
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="open"
                    v-model="mondaycheck"
                    true-value="Lukket"
                    false-value="Åben"
                  />
                  <label id="checklabel">{{mondaycheck}}</label>
                </div>
                <label for="monday" class="col-md-3 col-form-label ">Mandag</label>
                <div class="col-md-6">
                  <select class="select" v-model="monday" @change="onChange()">
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
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="open"
                    v-model="tuesdaycheck"
                    true-value="Lukket"
                    false-value="Åben"
                  />
                  <label id="checklabel">{{tuesdaycheck}}</label>
                </div>
                <label for="tuesday" class="col-md-3 col-form-label ">Tirsdag</label>
                <div class="col-md-6">
                  <select class="select" v-model="tuesday" @change="onChange()">
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
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="open"
                    v-model="wednesdaycheck"
                    true-value="Lukket"
                    false-value="Åben"
                  />
                  <label id="checklabel">{{wednesdaycheck}}</label>
                </div>
                <label for="wednesday" class="col-md-3 col-form-label ">Onsdag</label>
                <div class="col-md-6">
                  <select class="select" v-model="wednesday" @change="onChange()">
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
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="open"
                    v-model="thursdaycheck"
                    true-value="Lukket"
                    false-value="Åben"
                    @change="checked()"
                  />
                  <label id="checklabel">{{thursdaycheck}}</label>
                </div>
                <label for="thursday" class="col-md-3 col-form-label ">Torsdag</label>
                <div class="col-md-6">
                  <select class="select" v-model="thursday" @change="onChange()">
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
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="open"
                    v-model="fridaycheck"
                    true-value="Lukket"
                    false-value="Åben"
                    @change="checked()"
                  />
                  <label id="checklabel">{{fridaycheck}}</label>
                </div>
                <label for="firday" class="col-md-3 col-form-label ">Fredag</label>
                <div class="col-md-6">
                  <select class="select" v-model="friday" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option v-for="dish in dishes" :value="dish" :key="dish.ID">{{dish.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <input type="button" @click="createPost()" value="Gem dagens menu" />
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
      mondaycheck: "Åben",
      tuesdaycheck: "Åben",
      wednesdaycheck: "Åben",
      thursdaycheck: "Åben",
      fridaycheck: "Åben",
      mondaychecked: 1,
      tuesdaychecked: 1,
      wednesdaychecked: 1,
      thursdaychecked: 1,
      fridaychecked: 1
    };
  },
  methods: {
    checked() {
      if (this.mondaycheck == "Lukket") {
        this.mondaychecked = 0;        
      }

      if (this.tuesdaycheck == "Lukket") {
        this.tuesdaychecked = 0;
      }

      if (this.wednesdaycheck == "Lukket") {
        this.wednesdaychecked = 0;
      }

      if (this.thursdaycheck == "Lukket") {
        this.thursdaychecked = 0;
      }

      if (this.fridaycheck == "Lukket") {
        this.fridaychecked = 0;
      }
    },

    onChange() {
      this.selectedmonday = this.monday.ID;

      this.selectedtuesday = this.tuesday.ID;

      this.selectedwednesday = this.wednesday.ID;

      this.selectedthursday = this.thursday.ID;

      this.selectedfriday = this.friday.ID;
      //eslint-disable-next-line
      console.log(this.selectedfriday);
    },
    createPost() {
      if (
        this.monday == "" ||
        this.tuesday == "" ||
        this.wednesday == "" ||
        this.thursday == "" ||
        this.friday == ""
      ) {
        document.getElementById("banner").style.backgroundColor = "red";
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML =
          "der skal vælges noget i alle Felter";
        return;
      }

      const formData = new FormData();

      formData.append("monday", this.selectedmonday);
      formData.append("tuesday", this.selectedtuesday);
      formData.append("wednesday", this.selectedwednesday);
      formData.append("thursday", this.selectedthursday);
      formData.append("friday", this.selectedfriday);
      formData.append("mondaycheck", this.mondaychecked);
      formData.append("tuesdaycheck", this.tuesdaychecked);
      formData.append("wednesdaycheck", this.wednesdaychecked);
      formData.append("thursdaycheck", this.thursdaychecked);
      formData.append("fridaycheck", this.fridaychecked);

      Axios.post(
        "http://menustanderapi.test:8000/endpoints/setweekpost.php",
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
          return;
        })
        .catch(e => {
          //eslint-disable-next-line
          console.error("Failure!!");
          //eslint-disable-next-line
          console.log(e);
        });
    },

    init() {
      
    }
  },
  mounted() {
    Axios({
        method: "get",
        url: "http://menustanderapi.test:8000/endpoints/alleretter.php",
        headers: {
          Accept: "application/json"
        }
      }).then(response => {
        this.dishes = response.data.records;
        //eslint-disable-next-line
      console.log(response.data.records);
      });
  }
};
</script>