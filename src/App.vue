<template>
  <div class="app">
    <header>
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="../public/ico.png" width="35" height="35" alt="">
            Книга курсов
          </a>
          <div>
            <ul class="nav">
              <li class="nav-item">
                <button type="button" class="btn btn-outline-dark m-1">Регистрация</button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-outline-dark m-1">Логин</button>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
      <p></p>
    </header>

    <router-view></router-view>

    <footer>

    </footer>
  </div>
</template>

<script>
  
</script>

<style>

</style>

