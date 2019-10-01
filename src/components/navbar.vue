<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/admincomponents/admin">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
     
      <li class="nav-item dropdown">
        <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </router-link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <router-link class="dropdown-item" to="/admincomponents/setdaily">Set dagens retter</router-link>
          <router-link class="dropdown-item" to="/admincomponents/setweekmenu">Set ugens menu</router-link>
          <router-link class="dropdown-item" to="/admincomponents/createdish">opret en ret</router-link>
          <router-link class="dropdown-item" to="/admincomponents/createsidedish">opret en sideret</router-link>
          <router-link class="dropdown-item" to="/admincomponents/openhours">Set Åbningstider</router-link>
        </div>
      </li>
    </ul>
    <button class="btn navbar-btn" @click="Logout()">Logout</button>
  </div>
</nav>
</template>

<script>

export default {
  name: 'navbar',

  methods: { 
    Logout(){
      sessionStorage.clear();
      this.$router.push('/');
    }

  }
}
</script>

<style scoped>
h1 {
    text-align: center;
    color:red;
}
</style>
