<template>
  <div class="page" data-name="daily" :init="init()">
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
            <img class="img" src />
          </div>
          <div class="weekday">
            <h2>{{ today }}</h2>
          </div>
          <div class="dishtoday">
            <h3>{{ currentDay.name }}</h3>
          </div>
          <div class="priceleft">
            <p></p>
          </div>
          <div class="dishdes">
            <p></p>
          </div>
        </div>

        <div class="daydish" :bind="prop">
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
  name: "daily",
  data() {
    return {
      prop: [],
      week: {},
      currentDay: [],
      today: moment().format("dddd")
    };
  },
  methods: {
    dayOfWeek() {
      return moment().weekday();
    },

    currentTime() {
      return moment().format("HH, m, s");
    },

    Kald1() {
      return Axios.get(
        "http://menustanderapi.test:8000/endpoints/dagensret.php"
      );
    },
    kald2() {
      return Axios.get(
        "http://menustanderapi.test:8000/endpoints/ugensmenu.php"
      );
    },
    samling() {
      const that = this;
      //eslint-disable-next-line
      Axios.all([this.Kald1(), this.kald2()])
        .then(
          Axios.spread(function(kald1res, kald2res) {
            //eslint-disable-next-line
            //console.log(kald1res);
            //eslint-disable-next-line
            //console.log(kald2res.data.records[that.dayOfWeek() - 1]);
            that.currentDay = kald2res.data.records[that.dayOfWeek() - 1];
            that.prop = kald1res.data.records;
            that.week = kald2res.data.records;

            //document.getElementsByClassName("dishdes").innerHTML = kald1res
            //eslint-disable-next-line
          })
        )
        //eslint-disable-next-line
        .catch(e => console.error(e));
    },

    openTime: function() {
      return Axios.get(
        "http://menustanderapi.test:8000/endpoints/nextopentime.php"
      );
    },

    buttonStatus: function() {
      return Axios.get(
        "http://menustanderapi.test:8000/endpoints/knapsystemstatus.php"
      );
    },

    openClose: function() {
      const that = this;
      Axios.all([this.openTime(), this.buttonStatus()])
        .then(
          Axios.spread(function(openTimeres, buttonStatusres) {
            that.times = openTimeres.data.records;
            //eslint-disable-next-line
            //console.log(openTimeres.data.records[0].open);
            that.button = buttonStatusres.data.records;
            //eslint-disable-next-line
            //console.log(that.button);
            //this.status = response.data.records;
            //console.log(this.status[0].Status);

            //eslint-disable-next-line
            //console.log(moment().format("HH:mm:ss"));
            if (that.button[0].Status == "1") {
              document.getElementById("jombo").style.backgroundColor =
                "#84FF47";
              document.getElementById("jombotext").innerHTML =
                "Kantinen er Åben";
            }
            if (that.button[0].Status == "2") {
              document.getElementById("jombo").style.backgroundColor = "red";
              document.getElementById("jombotext").innerHTML = "Kantinen er Lukket";
              document.getElementById("timetext").innerHTML = "Åbner igen kl: " + that.times[0].open;
            }
          })
        ) //eslint-disable-next-line
        .catch(e => console.error(e));
    },

    timer: function() {
      this.openClose();

      setInterval(
        function() {
          this.openClose();
        }.bind(this),
        10000
      );
    },
    init() {}
  },
  mounted() {
    this.samling();
    this.openClose();
    //this.timer();
  }
};
</script>
