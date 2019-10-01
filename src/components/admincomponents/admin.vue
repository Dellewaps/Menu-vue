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
                <input type="button" @click="registereBruger()" value="Registere en bruger" style="width: 180px"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="createDish()" value="Opret en ret" style="width: 180px"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="createSideDish()" value="Opret en diverse ret" style="width: 180px"/>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-4">
                <input type="button" @click="openHours()" value="Set åbningstider" style="width: 180px"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="setDaily()" value="Set dagens retter" style="width: 180px"/>
              </div>
              <div class="col-md-4">
                <input type="button" @click="setWeekmenu()" value="Sæt ugens menu" style="width: 180px"/>
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
    // Check som ser efter om man er logget ind
    beforeCreate(){
      if(!sessionStorage.getItem('loggedIn')){
        this.$router.push('/admincomponents/login');
      }
    },
  name: 'admin',
  components: {
      'navbar' : navbar
  },

  methods: {

    // Knappe functioner til side skift
    registereBruger(){
      this.$router.push('/admincomponents/registere')
    },

    createDish(){
      this.$router.push('/admincomponents/createdish')
    },

    createSideDish(){
      this.$router.push('/admincomponents/createsidedish')
    },

    openHours(){
      this.$router.push('/admincomponents/openhours')
    },

    setDaily(){
      this.$router.push('/admincomponents/setdaily')
    },

    setWeekmenu(){
      this.$router.push('/admincomponents/setweekmenu')
    }
  }
  
 
}
  </script>
  
