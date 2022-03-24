<template>
  <div id="box">
    <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle">
            <img src="../assets/icons/bars-solid.svg" min-height="20px" min-width="20px"/>
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
          <a href="#" class="nav-links" v-on:click="logout();">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <div v-for="(item, index) in items" v-bind:key="item.id" class="data">
      <div class="item">
        <div class="category" v-on:click="openStudooList(item.category)">
          <h2 class="subtitle">{{ item.category }}</h2>
        </div>
        <img class="fa-trash" src="../assets/icons/trash-solid.svg" v-on:click="removeStudooList(index,item.category)"/>
      </div>
    </div>
    <div class="item addCat" v-on:click="addStudooList()">
      <img class="imgplus" src="../assets/plus.png" alt="plus">
    </div>
  </div>
</template>

<script>
import router from "@/rooter";

export default {
  name: "UserMenu",
  data() {
    return{
      items: [
      ]
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      if (!sessionStorage.getItem('token')) {
        router.push("/signin");
      }
    },
    openStudooList(item) {
      sessionStorage.setItem('studoolist', item);
      router.push("/studoolist/"+item);
    },
    addStudooList(){
      let name = prompt("Choose a name for this Stu'doo List !");
      let bool = true;
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].category === name){
          alert("This name is already used !");
          bool = false;
          return;
        }
      }

      if(bool && name.match(/^[A-Za-z][A-Za-z0-9_]{3,12}$/)){

        let test = {
          token: sessionStorage.getItem('token'),
        }

        const requestOptions = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          },
          json: true,
          body: JSON.stringify(test),
        };
        console.log(name);
        fetch("http://localhost:3000/studoolist/"+name+"", requestOptions).then(response => response.json()).then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.items.push({
              category: name
            });
          }
        });


      } else {
        alert("Invalid name !");
      }
    },
    removeStudooList(index, name){
      this.items.splice(index,1);

      let test = {
        token: sessionStorage.getItem('token'),
        delete: true,
      }
      const requestOptions = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        json: true,
        body: JSON.stringify(test),
      };
      console.log(name);
      fetch("http://localhost:3000/studoolist/"+name, requestOptions).then(response => response.json()).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        console.log(data)
      });
    }
  },
  mounted() {
    let mainNav = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");
    navBarToggle.addEventListener("click", function() {
      mainNav.classList.toggle("active");
    });

    let test = {
      token: sessionStorage.getItem('token'),
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      json: true,
      body: JSON.stringify(test),
    };
    console.log(name);
    fetch("http://localhost:3000/studoolist", requestOptions).then(response => response.json()).then((data) => {
      if (data.error) {
        console.log(data.error);
      }else {
        for (let i = 0; i < data.studoolist.length; i++) {
          this.items.push({
            category: data.studoolist[i].name
          });
        }
      }
    });
  },
  beforeMount() {
    if (sessionStorage.getItem('token')) {
      router.push("/studoolist");
    } else {
      router.push("/signin");
    }
  }

}

</script>

<style scoped>

@font-face {
  font-family: 'popins-regular';
  src: url('../assets/fonts/Poppins/Poppins-Regular.ttf');
}

.item{
  cursor: pointer;
}
#box {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.navbar {
  margin-top: -8px;
  margin-left: -8px;
  margin-right: -8px;
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
  font-size: 24px;
  height: 20px;
  width: 20px;
}

.active{
  display: block;
}

.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, auto);
  justify-items: center;
  grid-gap: 50px;
  height: 100%;
  width: 100%;
  margin-top: 50px;
}
@media screen and (max-width: 1256px) {
  .container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (max-width: 1080px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 780px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 480px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}


.item .fa-trash{
  cursor: pointer;
  font-size: 24px;
  height: 20px;
  width: 20px;
}

.fa-trash:hover{
  filter: brightness(0) saturate(100%) invert(8%) sepia(94%) saturate(5909%) hue-rotate(12deg) brightness(87%) contrast(114%);
}

.item .category h2{
  margin: auto;
  padding-top: 120px;
  padding-bottom: 85px;
}

.item{
  margin-top: 0;
  background-color: #fff;
  height: 300px;
  width : 200px;
  border-radius: 50px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
  margin-bottom: 10px;
}

.item:hover{
  box-shadow: rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0 18px 36px -18px inset;
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
    margin-right: 10px;
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