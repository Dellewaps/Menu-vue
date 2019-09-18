  <template>
    <div class="container">
    <div class="navbar">
      <navbar />
    </div>
    <div class="banner" id="banner">banner ffs</div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Administration</div>
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-4">
                <input type="button" @click="registereBruger()" value="Registere en bruger"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="createDish()" value="Opret en ret"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="createSideDish()" value="Opret en diverse ret"/>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-4">
                <input type="button" @click="openHours()" value="Set åbningstider"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="setDaily()" value="Set dagens retter"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="setWeekmenu()" value="Sæt ugens menu"/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from '../navbar.vue'

  export default {
    beforeCreate(){
      if(!sessionStorage.getItem('loggedIn')){
        window.location.href = '/admincomponents/login';
      }
    },
  name: 'admin',
  components: {
      'navbar' : navbar
  },

  methods: {

    registereBruger(){
      window.location.href = '/admincomponents/registere';
    },

    createDish(){
      window.location.href = '/admincomponents/createdish';
    },

    createSideDish(){
      window.location.href = '/admincomponents/createsidedish';
    },

    openHours(){
      window.location.href = '/admincomponents/openhours';
    },

    setDaily(){
      window.location.href = '/admincomponents/setdaily';
    },

    setWeekmenu(){
      window.location.href = '/admincomponents/setweekmenu';
    }
  }
  
 
}
  </script>
  
