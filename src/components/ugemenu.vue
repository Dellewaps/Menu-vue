<template>
  <div class="page" data-name="ugemenu" :beforein="init()">
    <!-- Menu container -->
    <div class="jumbotron jumbotron-fluid" id="jombo">
      <div class="container">
        <h1 class="display-6" id="jombotext"></h1>
        <p class="lead">Ugens Menu</p>
      </div>
    </div>
    <div class="container">
      <div class="row mb-3" :bind="prop">
        <div class="col-md-6">
          <div class="days-left">
            <div class="imageleft">
              <img class="img" src />
            </div>
            <h2>Mandag</h2>
            <h3 class="mandagretnavn">{{prop[0].name}}</h3>
            <div class="priceleft">
              <h4 class="pricemandag">{{prop[0].price}}</h4>
            </div>
            <h4 class="tilbehørmandag">{{prop[0].accessories}}</h4>
          </div>

          <div class="days-left">
            <div class="imageleft">
              <img class="img" src />
            </div>
            <h2>Onsdag</h2>
            <h3>{{prop[2].name}}</h3>
            <div class="priceleft">
              <h4>{{prop[2].price}}</h4>
            </div>
            <h4>{{prop[2].accessories}}</h4>
          </div>

          <div class="days-left">
            <div class="imageleft">
              <img class="img" src />
            </div>
            <h2>Fredag</h2>
            <h3>{{prop[4].name}}</h3>
            <div class="priceleft">
              <h4>{{prop[4].price}}</h4>
            </div>
            <h4>{{prop[4].accessories}}</h4>
          </div>
        </div>
        <div class="col-md-6" id="col-right">
          <div class="days-right">
            <div class="imageright">
              <img class="img" src />
            </div>
            <h2>Tirsdag</h2>
            <h3>{{prop[2].name}}</h3>
            <div class="priceright">
              <h4>{{prop[2].price}}</h4>
            </div>
            <h4>{{prop[2].accessories}}</h4>
          </div>

          <div class="days-right">
            <div class="imageright">
              <img class="img" src />
            </div>
            <h2>Torsdag</h2>
            <h3>{{prop[3].name}}</h3>
            <div class="priceright">
              <h4>{{prop[3].price}}</h4>
            </div>
            <h4>{{prop[3].accessories}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { setInterval } from 'timers';

export default {
  name: "ugemenu",
  data() {
    return {
      prop: ["", "", "", "", ""],
      status: []
    };
  },
  methods: {
    loadData: function() {
      Axios({
        method: "get",
        url: "http://menustanderapi.test:8000/endpoints/knapsystemstatus.php",
        headers:{
          Accept: "application/json"
        }
      })
      .then(response => {
        this.status = response.data.records;
        //console.log(this.status[0].Status);
        if (this.status[0].Status == "1")
      {
        document.getElementById("jombo").style.backgroundColor = "#84FF47";
        document.getElementById("jombotext").innerHTML = "Kantinen er Åben";
      }
      if (this.status[0].Status == "2")
      {
        document.getElementById("jombo").style.backgroundColor = "red";
        document.getElementById("jombotext").innerHTML = "Kantinen er Lukket";
      }
      }).catch(e => console.error(e))      
    },    

    timer: function(){
      this.loadData();

      setInterval(function(){
        this.loadData();
      }.bind(this), 10000);
    },

    init() {
      Axios({
        method: "get",
        url: "http://menustanderapi.test:8000/endpoints/ugensmenu.php",
        headers: {
          Accept: "application/json"
        }
      }).then(response => {
        this.prop = response.data.records;
      });
    }
    
  },
  mounted() {
    this.loadData()
    this.timer()
  }
};
</script>