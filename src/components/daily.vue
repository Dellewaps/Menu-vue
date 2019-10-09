<template>
  <div class="page" data-name="daily" :beforein="init()">
    <div class="jumbotron jumbotron-fluid" id="jombo">
      <div class="container">
        <h1 class="display-6" id="jombotext"></h1>
        <p class="opentimes" id="timetext"></p>
        <p class="lead">Dagens Menu</p>
      </div>
    </div>
    <div class="container">
      <div class="dayrow">
        <div class="daydish" :bind="currentDay">
          <div class="dayhead">
            <h1>Dagens Ret</h1>
          </div>
          <div class="imageleft">
            <img class="img" v-bind:src="require('../../public/images/' + currentDay.photo)" />
          </div>
          <div class="weekday">
            <h2>{{ today }}</h2>
          </div>
          <div class="dishtoday">
            <h3>{{ currentDay.name }}</h3>
          </div>
          <div class="priceleft">
            <h4>{{ currentDay.price }} kr</h4>
          </div>
          <div class="dishdes">
            <h4>{{ currentDay.accessories }}</h4>
          </div>
        </div>

        <div class="divdish" :bind="prop">
          <h3>Diverse retter i dag</h3>
          <ul class="divdishlist" v-for="props in prop" :key="props.id">
            <div class="divname">{{ props.name }}</div>
            <div class="divdisc">{{ props.description}}</div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import moment from "moment";
moment.locale("da");

export default {
  beforeMount() {
    this.$destroy;
  },
  name: "daily",
  data() {
    return {
      prop: [],
      week: {},
      currentDay: [],
      today: moment().format("dddd"),
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

    // Her bliver tiden formateret
    currentTime() {
      return moment().format("HH, m, s");
    },

    // Kald til endpoint for at få dagens retter
    Kald1() {
      return Axios.get(
        "/endpoints/dagensret.php"
      );
    },

    // Kald til endpoint for at få ugens menu
    kald2() {
      return Axios.get(
        "/endpoints/ugensmenu.php"
      );
    },
    // Her samles de to kald så data kan bruges
    samling() {
      const that = this;
      //eslint-disable-next-line
      Axios.all([this.Kald1(), this.kald2()])
        .then(
          Axios.spread(function(kald1res, kald2res) {
            that.currentDay = kald2res.data.records[that.dayOfWeek()];
            that.prop = kald1res.data.records;
            that.week = kald2res.data.records;
          })
        )
        //eslint-disable-next-line
        .catch(e => console.error(e));
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
            let weekdays = [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday"
            ];
            that.closed.forEach(function(day, index) {
              if (day[weekdays[index]] == 1) {
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
                  }
                }
                return;
              } else {
                document.getElementById("jombo").style.backgroundColor = "red";
                document.getElementById("jombotext").innerHTML =
                  "Kantinen er Lukket";
                document.getElementById("timetext").innerHTML =
                  "Åbner igen i morgen ";
              }
            });
          })
        ) //eslint-disable-next-line
        .catch(e => console.error(e));
    },

    // Timer så siden bliver reloadet hver 10 sek
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
        //eslint-disable-next-line
        console.log(this.timercount);
        this.timer();
        }, 5000);
    },

    pageswitch: function() {
      this.$router.replace("/ugemenu");
    },
    init() {}
  },
  beforeDestroy () {
      clearInterval(this.myTimer);
    },
  mounted() {
    this.samling();
    this.closedCheck();
    this.openClose();
    this.timer();
  }
};
</script>
