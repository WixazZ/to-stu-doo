<template>
  <div id="box">
    <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle">
            <img src="../assets/icons/bars-solid.svg" min-height="20px" min-width="20px" alt="bar"/>
        </span>
      <a href="#" class="logo">logo</a>
      <ul class="main-nav" id="js-menu">
        <li>
          <a href="#" class="nav-links">Home</a>
        </li>
        <li class="routernav">
          <router-link class="nav-links" to="/studoolist">My Stu'Doo lists</router-link>
        </li>
        <li>
          <a href="#" class="nav-links" v-on:click="logout();">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="global">
    <div class="state todo_class">
      <h1>Todo</h1>
      <div class="container todo">
        <div v-for="(item) in items" v-bind:key="item.id" class="data">
          <div v-if="item.status === 0">
            <div class="item itemComponent">
              <div class="insideItem">
                {{item.name}}
              </div>
              <div class="insideItem">
                {{item.content}}
              </div>
              <div class="insideItem">
                <label for="tasktodo">Select task's status:</label>
                <br/>
                <select name="status" id="tasktodo" @change="switchSelect($event, item)">
                  <option value="default"></option>
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div class="insideItem">
                <img class="fa-trash" src="../assets/icons/trash-solid.svg" v-on:click="removeStudooList(index,item.category)"/>
              </div>
            </div>
          </div>
        </div>
        <div class="item addCat" v-on:click="addTask()">
          <img class="imgplus" src="../assets/plus.png" alt="plus">
        </div>
      </div>
    </div>

    <div class="state doing_class">
      <h1>Doing</h1>
      <div class="container doing">
        <div v-for="(item) in items" v-bind:key="item.id" class="data">
          <div v-if="item.status === 1">
            <div class="item itemComponent">
              <div class="insideItem">
                {{item.name}}
              </div>
              <div class="insideItem">
                {{item.content}}
              </div>
              <div class="insideItem">
                <label for="doing">Select task's status:</label>
                <br/>
                <select name="status" id="doing" @change="switchSelect($event, item)">
                  <option value="default"></option>
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div class="insideItem">
                <img class="fa-trash" src="../assets/icons/trash-solid.svg" v-on:click="removeStudooList(index,item.category)"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="state done_class">
      <h1>Done</h1>
      <div class="container done">
        <div v-for="(item) in items" v-bind:key="item.id" class="data">
          <div v-if="item.status === 2">
            <div class="item itemComponent">
              <div class="insideItem">
                {{item.name}}
              </div>
              <div class="insideItem">
                {{item.content}}
              </div>
              <div class="insideItem">
                <label for="done">Select task's status:</label>
                <br/>
                <select name="status" id="done" @change="switchSelect($event, item)">
                  <option value="default"></option>
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div class="insideItem">
                <img class="fa-trash" src="../assets/icons/trash-solid.svg" v-on:click="removeStudooList(index,item.category)"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import router from "@/rooter";

export default {
  name: "StudooList",
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
    switchSelect(event, item) {

      switch (event.target.value){
        case "todo":
          item.status = 0;
          break;
        case "doing":
          item.status = 1;
          break;
        case "done":
          item.status = 2;
          break;
      }

      let test = {
        token: sessionStorage.getItem('token'),
        id: item.id,
        status: item.status,
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
      fetch("http://localhost:3000/task/update", requestOptions).then(response => response.json()).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
      });



    },
    addTask(){
      let name = prompt("Enter your task Name :");

      let content = prompt("Enter your task content :");

      let bool = true;
      if (this.items.length === 0){
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i].category === name){
            alert("This name is already used !");
            bool = false;
            return;
          }
        }
      }

      if(bool && (name.length <= 15 && name.length > 3) && (content.length <= 50 && content.length >= 5)){

        let test = {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('studoolist'),
          nameTask: name,
          contentTask: content
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
        fetch("http://localhost:3000/task/send", requestOptions).then(response => response.json()).then((data) => {
          if (data.error) {
            console.log(data.error);
          }
          this.items.push({
            id: data.id,
            name: name,
            content: content,
            status: 0,
            category: name
          });
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
      fetch("http://localhost:3000/task/delete", requestOptions).then(response => response.json()).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
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
      name: sessionStorage.getItem('studoolist')
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
    fetch("http://localhost:3000/task", requestOptions).then(response => response.json()).then((data) => {
      if (data.error) {
        console.log(data.error);
      }else {
        for (let i = 0; i < data.tasks.length; i++) {
          this.items.push({
            id: data.tasks[i].id,
            name: data.tasks[i].name,
            content: data.tasks[i].content,
            status: data.tasks[i].status,
          });
        }
      }
    });
  },
  beforeMount() {
    if (!sessionStorage.getItem('token')) {
      router.push("/signin");
    }
  }

}

</script>

<style scoped>

.global{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.state{
  align-items: center;
}


.itemComponent{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
}


@font-face {
  font-family: 'popins-regular';
  src: url('../assets/fonts/Poppins/Poppins-Regular.ttf');
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
  justify-items: center;
  height: 100%;
  width: 100%;
  margin-top: 50px;
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
.item .fa-trash{
  cursor: pointer;
  font-size: 24px;
  height: 20px;
  width: 20px;
}

.fa-trash:hover{
  filter: brightness(0) saturate(100%) invert(8%) sepia(94%) saturate(5909%) hue-rotate(12deg) brightness(87%) contrast(114%);
}
</style>