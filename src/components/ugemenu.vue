<template>
  <div class="page" data-name="ugemenu" :beforein="init()">
    <!-- Menu container -->
    <div class="jumbotron jumbotron-fluid" id="jombo">
      <div class="container">
        <h1 class="display-6" id="jombotext"></h1>
        <p class="opentimes" id="timetext"></p>
        <p class="lead">Ugens Menu</p>
      </div>
    </div>
    <div class="ugen">
      <div class="row mb-3" :bind="prop">
        <div class="col-md-5">
          <div class="days-left">
            <div class="imageleft">
              <img class="img" v-bind:src="require('../../public/images/' + prop[0].photo)" />
            </div>
            <h2>Mandag</h2>
            <h3 class="mandagretnavn">{{prop[0].name}}</h3>
            <div class="priceleft">
              <h4 class="pricemandag">{{prop[0].price}} kr</h4>
            </div>
            <h4 class="tilbehørmandag">{{prop[0].accessories}}</h4>
          </div>
        </div>
        <div class="col-md-5" id="col-right">
          <div class="days-right">
            <div class="imageright">
              <img class="img" v-bind:src="require('../../public/images/' + prop[1].photo)" />
            </div>
            <h2>Tirsdag</h2>
            <h3>{{prop[1].name}}</h3>
            <div class="priceright">
              <h4>{{prop[1].price}} kr</h4>
            </div>
            <h4>{{prop[1].accessories}}</h4>
          </div>
        </div>
        <div class="col-md-5">
          <div class="days-left">
            <div class="imageleft">
              <img class="img" v-bind:src="require('../../public/images/' + prop[2].photo)" />
            </div>
            <h2>Onsdag</h2>
            <h3>{{prop[2].name}}</h3>
            <div class="priceleft">
              <h4>{{prop[2].price}} kr</h4>
            </div>
            <h4>{{prop[2].accessories}}</h4>
          </div>
        </div>
        <div class="col-md-5" id="col-right">
          <div class="days-right">
            <div class="imageright">
              <img class="img" v-bind:src="require('../../public/images/' + prop[3].photo)" />
            </div>
            <h2>Torsdag</h2>
            <h3>{{prop[3].name}}</h3>
            <div class="priceright">
              <h4>{{prop[3].price}} kr</h4>
            </div>
            <h4>{{prop[3].accessories}}</h4>
          </div>
        </div>
        <div class="col-md-6 friday">
          <div class="days-center">
            <div class="imageleft">
              <img class="img" v-bind:src="require('../../public/images/' + prop[4].photo)" />
            </div>
            <h2>Fredag</h2>
            <h3>{{prop[4].name}}</h3>
            <div class="priceleft">
              <h4>{{prop[4].price}} kr</h4>
            </div>
            <h4>{{prop[4].accessories}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
//import { setInterval } from "timers";
import moment from "moment";
//import Vue from "vue";
moment.locale("da");

export default {
  name: "ugemenu",
  data() {
    return {
      prop: [],
      status: [],
      open: [],
      closed: [],
      timercount: 0,
      myTimer: null,
    };
  },

  methods: {
    // Her hentes ugens dag
    dayOfWeek() {
      return moment().weekday();
    },
    // Et check på om der er lukket
    closedCheck: function() {
      Axios.get("/endpoints/closedcheck.php")
        .then(response => {
          this.closed = response.data.records;
        })
        .catch(function(error) {
          //eslint-disable-next-line
          console.log(error);
        });
    },

    // Kald til endpoint for at få åbningstider
    openTime: function() {
      return Axios.get(
        "/endpoints/nextopentime.php"
      );
    },

    // Kald til endpoint for status på knapsystemet
    buttonStatus: function() {
      return Axios.get(
        "/endpoints/knapsystemstatus.php"
      );
    },

    // Her samles de to kald så data kan bruges
    openClose: function() {
      const that = this;
      this.closedCheck();
      Axios.all([this.openTime(), this.buttonStatus()])
        .then(
          Axios.spread(function(openTimeres, buttonStatusres) {
            that.times = openTimeres.data.records;
            that.button = buttonStatusres.data.records;
            
            for (var i = 0, len = that.closed.length; i < len; i++ )  {
                if(that.dayOfWeek() == i){
                if(Object.values(that.closed[i]) == 1)
               {
                 if (that.button[0].Status == "1") {
                  document.getElementById("jombo").style.backgroundColor =
                    "#84FF47";
                  document.getElementById("jombotext").innerHTML =
                    "Kantinen er Åben";
                  document.getElementById("timetext").innerHTML = "";
                } else {
                  document.getElementById("jombo").style.backgroundColor =
                    "red";
                  document.getElementById("jombotext").innerHTML =
                    "Kantinen er Lukket";
                  if (that.times[0]) {
                    document.getElementById("timetext").innerHTML =
                      "Åbner igen kl: " + that.times[0].open;
                  }else{
                    document.getElementById("timetext").innerHTML =
                      "Vent venligst ";
                  }
                }
               }else{
                 document.getElementById("jombo").style.backgroundColor = "red";
                document.getElementById("jombotext").innerHTML =
                  "Kantinen er Lukket";
                  
                document.getElementById("timetext").innerHTML =
                  "Åbner igen i morgen ";
               }
                }
              }
          })
        ) //eslint-disable-next-line
        .catch(e => console.error(e));
    },

    // Timer så siden bliver reloadet
    timer: function() {
      this.openClose();
      this.myTimer = setTimeout(() => {
        
        this.timercount++;
        if (this.timercount == 12) {
          this.timercount = 0;
          clearInterval(this.myTimer);
          //eslint-disable-next-line
        console.log("pageswitch");
          this.pageswitch();
        }
      this.timer();
      }, 5000);
    },

    pageswitch: function() {
      this.$router.replace("/daily");
    },

    init() {}
  },
  beforeDestroy () {
      clearInterval(this.myTimer);
    },
  mounted() {
    // Kald til endpoint for at få ugens menu data
    Axios({
      method: "get",
      url: "/endpoints/ugensmenu.php",
      headers: {
        Accept: "application/json"
      }
    }).then(response => {
      this.prop = response.data.records;
    });
    this.closedCheck();
    this.openClose();
    this.timer();
  }
};
</script>