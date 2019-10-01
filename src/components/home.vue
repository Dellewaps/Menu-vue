<template>
  <div id="home">
    <div class="page-content">
      <div class="menubutton"><router-link to="/ugemenu">  <button>Ugens Menu</button></router-link></div>
      <div class="menubutton"><router-link to="/daily">  <button>Dagens Menu</button></router-link></div>
      <div class="adminbutton"><router-link to="/admincomponents/login">  <button>Admin</button></router-link></div>
    </div>    
    
  </div>
</template>

<script>

export default {
 
  name: 'home',
}
</script>