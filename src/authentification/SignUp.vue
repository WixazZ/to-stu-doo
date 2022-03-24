<template>
  <div id="box">
    <h1>Sign Up</h1>
    <p>Already have an account ? <router-link to="/signin">Sign In</router-link></p>

    <form v-on:submit="signUp()">
      <div class="form-group">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="Username" required>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
        <input type="password" class="form-control" id="confirmPassword" v-model="password" placeholder="Confirm your password" required>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>

    </form>
  </div>
</template>

<script>
import router from "@/rooter";

export default {

  name: "SignUp",
  methods: {
    checkUsername(){
      return /^[a-zA-Z0-9]{3,20}$/.test(document.getElementById("username").value);
    },
    checkPassword(){
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/.test(document.getElementById("password").value);
    },
    checkEmail(){
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value)
    },
    confirmPassword(){
      return document.getElementById("password").value === document.getElementById("confirmPassword").value;
    },
    checkInputs(){
      if(!this.checkEmail()){
        alert("Invalid Email");
        return false;
      }else if(!this.checkUsername()){
        alert("Username length should be from 3 to 20 and contains letters and numbers only");
        return false
      }else if(!this.checkPassword()){
        alert("Minimum eight characters, at least one letter and one number");
        return false
      }else if(!this.confirmPassword()){
        alert("Password confirmation different from password");
        return false
      }
      return true;
    },
      signUp() {
        event.preventDefault();
        let test = {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
          mail: document.getElementById("email").value
        }
        console.log(test);
        if (this.checkInputs()) {
          const requestOptions = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8'
            },
            json: true,
            body: JSON.stringify(test),
          };

          fetch("http://localhost:3000/signup", requestOptions).then(response => response.json()).then((data) => {
            if (data.token) {
              sessionStorage.setItem('token', data.token);
              router.push("/studoolist");
            }
          });
        }
    }
  },
  beforeMount() {
    if (sessionStorage.getItem('token')) {
      router.push("/studoolist");
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'popins-regular';
  src: url('../assets/fonts/Poppins/Poppins-Regular.ttf');
}
template{

}

#box {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 18vh;
  width: 500px;
  height: 600px;
  background-color: #fff;
  border-radius: 40px;
  text-align: center;
  box-shadow: rgba(255, 255, 255, 0.1) 0 1px 1px 0 inset, rgba(50, 50, 93, 0.25) 0 50px 100px -20px, rgba(0, 0, 0, 0.3) 0 30px 60px -30px;
}

p{
  font-family: 'popins-regular', sans-serif;
}
h1 {
  font-family: 'popins-regular', sans-serif;
  padding-top: 10px;
}

form {

  margin-top: 5vh;
}

input {
  width: 70%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #C4C4C4;
  color: white;
  font-size: 15px;
  border-radius: 10px;
  box-sizing: border-box;
}
::placeholder {
  color: white;
  opacity: 0.5;
}
input:not(:placeholder-shown){
  background-color: white;
  color: black;
  font-weight: bold;
}

.btn{
  width: 20%;
  margin: 30px auto;
  padding: 10px;
  border-radius: 10px;

  cursor: pointer;
  background-color: #F3D432;
  font-size: 16px;
}


</style>