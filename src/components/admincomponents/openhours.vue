<template>
  <div class="page" data-name="openhours" :beforein="init()">
    <div class="container">
      <div class="navbar">
        <navbar />
        <div class="banner" id="banner">banner ffs</div>
      </div>
      <div class="content">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Set Åbnings tider</div>

              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Morgen:</label>
                  <div class="col-md-2">
                    <input type="time" placeholder="Prisen" />
                    <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Formiddag:</label>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Middag:</label>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Eftermiddag:</label>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
                  <p>til</p>
                  <div class="col-md-2">
                  <input type="time" placeholder="Prisen" />
                  <span class="text-danger"></span>
                  </div>
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

export default {
  name: "openhours",
  components: {
    navbar: navbar
  },
  data() {
    return {
      currentDay: [],
      description: ""
    };
  },
  methods: {
    init() {}
  },
  mounted() {}
};
</script>
