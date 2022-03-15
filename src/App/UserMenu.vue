<template>
  <div id="box">
    <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle">
            <i class="fas fa-bars">Test</i>
        </span>
      <a href="#" class="logo">logo</a>
      <ul class="main-nav" id="js-menu">
        <li>
          <a href="#" class="nav-links">Home</a>
        </li>
        <li>
          <a href="#" class="nav-links">My Stu'Doo lists</a>
        </li>
        <li>
          <a href="#" class="nav-links">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="data">
      <div class="item"></div>
      <h2 class="subtitle">text</h2>
    </div>
    <div class="item addCat" onclick="">
      <img class="imgplus" src="../assets/plus.png" alt="plus">
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  components: {},
  mounted() {
    let mainNav = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");

    navBarToggle.addEventListener("click", function() {
      mainNav.classList.toggle("active");
    });
  }

}

</script>

<style scoped>

@font-face {
  font-family: 'popins-regular';
  src: url('../assets/fonts/Poppins/Poppins-Regular.ttf');
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.navbar {
  min-width: 100vw;
  margin-top: -0.5em;
  margin-left: -0.5em;
  font-size: 18px;
  background-color: darkorchid;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}

.main-nav {
  list-style-type: none;
  display: none;
}

.nav-links,
.logo {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}

.logo {
  display: inline-block;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

.active {
  display: block;
}

.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, auto);
  justify-items: center;
  grid-gap: 50px;
  height: 100%;
  width: 100vw;
  margin-top: 50px;

}

.item{
  border: 1px solid ;
  background-color: #fff;
  height: 300px;
  width : 200px;
  border-radius: 50px;
  box-shadow: -10px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
}

.addCat{
  opacity: 0.5;
  text-align: center;

}
.data{
  text-align: center;

}
.imgplus{
  margin-top: 50%;
  width: 50%;
  align-items: center;
  justify-content: center;
}

.subtitle{
  font-family: popins-regular, sans-serif;
  font-size: 30px;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;

  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  .nav-links {
    margin-left: 40px;
  }

  .logo {
    margin-top: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .logo:hover,
  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>