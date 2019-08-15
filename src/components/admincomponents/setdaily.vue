<template>
  <div class="page" data-name="ugemenu" :beforein="init()">
    <div class="container">
      <div class="navbar">
        <navbar/>
        <div class="banner" id="banner">banner ffs</div> 
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card" :bind="sides">
            <div class="card-header">Set dagens menu</div>
            <div class="form-group row" :bind="currentDay">
              <label for="Description" class="col-md-4 col-form-label text-md-right">Tilbehør</label>

              <div class="col-md-6">
                <textarea v-model="description" :placeholder="currentDay.accessories">
                </textarea>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <label for="sidedish" class="col-md-4 col-form-label text-md-right">Diverse</label>

                <div class="col-md-6">
                  <select v-model="sideone" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="side in sides"
                      :value="side"
                      :key="side.id"
                    >{{side.name}} {{side.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="sidedish" class="col-md-4 col-form-label text-md-right">Diverse</label>

                <div class="col-md-6">
                  <select v-model="sidetwo" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="side in sides"
                      :value="side"
                      :key="side.id"
                    >{{side.name}} {{side.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="sidedish" class="col-md-4 col-form-label text-md-right">Diverse</label>

                <div class="col-md-6">
                  <select v-model="sidethree" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="side in sides"
                      :value="side"
                      :key="side.id"
                    >{{side.name}} {{side.description}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="sidedish" class="col-md-4 col-form-label text-md-right">Diverse</label>

                <div class="col-md-6">
                  <select v-model="sidefour" @change="onChange()">
                    <option disabled value>Please select one</option>
                    <option
                      v-for="side in sides"
                      :value="side"
                      :key="side.id"
                    >{{side.name}} {{side.description}}</option>
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
import moment from "moment";
moment.locale("da");

export default {
  name: "setdaily",
  components: {
    navbar: navbar
  },
  data() {
    return {
      sides: [],
      sideone:'',
      sidetwo:'',
      sidethree:'',
      sidefour:'',
      selectedsideone: 0,
      selectedsidetwo: 0,
      selectedsidethree: 0,
      selectedsidefour: 0,   
      currentDay: [],
      description: '',
    };
  },
  methods: {
    dayOfWeek() {
      return moment().weekday();
    },
    Kald1() {
      return Axios.get("http://menustanderapi.test:8000/endpoints/sideret.php");
    },
    kald2() {
      return Axios.get("http://menustanderapi.test:8000/endpoints/ugensmenu.php");
    },
    samling() {
      const that = this;
      //eslint-disable-next-line
      Axios.all([this.Kald1(), this.kald2()])
        .then(
          Axios.spread(function(kald1res, kald2res) {
            //eslint-disable-next-line
            console.log(kald1res);
            //eslint-disable-next-line
            console.log(kald2res.data.records[that.dayOfWeek() - 1]);
            that.currentDay = kald2res.data.records[that.dayOfWeek() - 1];
            that.sides = kald1res.data.records;
            that.week = kald2res.data.records;

            //eslint-disable-next-line
          })).catch(e => console.error(e));
    },

    onChange() {
        this.selectedsideone = this.sideone.ID
        //eslint-disable-next-line
        console.log(this.selectedsideone)

        this.selectedsidetwo = this.sidetwo.ID   
        //eslint-disable-next-line
        console.log(this.selectedsidetwo)

        this.selectedsidethree = this.sidethree.ID      
        //eslint-disable-next-line
        console.log(this.selectedsidethree)

        this.selectedsidefour = this.sidefour.ID
        //eslint-disable-next-line
        console.log(this.selectedsidefour)
    },

    createPost() {
      if(this.description == '')
      {
          this.description = this.currentDay.accessories
          //eslint-disable-next-line
          console.log(this.description)
      }else
      {
        this.description = this.description
        //eslint-disable-next-line
        console.log(this.description)
      }

      const formData = new FormData();

      formData.append('sideone', this.selectedsideone)
      formData.append('sidetwo', this.selectedsidetwo)
      formData.append('sidethree', this.selectedsidethree)
      formData.append('sidefour', this.selectedsidefour)
      formData.append('description', this.description)

      Axios.post("http://menustanderapi.test:8000/endpoints/setdailypost.php", 
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

    init() {}
  },
  mounted() {
    this.samling();
  }
};
</script>
