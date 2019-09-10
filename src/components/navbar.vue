<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/admincomponents/admin">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
     
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/admincomponents/setdaily">Set dagens retter</a>
          <a class="dropdown-item" href="/admincomponents/setweekmenu">Set ugens menu</a>
          <a class="dropdown-item" href="/admincomponents/createdish">opret en ret</a>
          <a class="dropdown-item" href="/admincomponents/createsidedish">opret en sideret</a>
          <a class="dropdown-item" href="/admincomponents/openhours">Set Åbningstider</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>

export default {
  name: 'navbar',
}
</script>

<style scoped>
h1 {
    text-align: center;
    color:red;
}
</style>
