<template>
  <div id="box">
    <h1>Sign Up</h1>
    <p>Create your To Stu'Doo Account</p>

    <form @submit.prevent="signIn">
      <div class="form-group">
        <input type="text" class="form-control" id="email" v-model="username" placeholder="Username" required>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
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
  margin-top: 25vh;
  width: 500px;
  height: 50vh;
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
  margin: 3vh auto;
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
  margin: 5% auto;
  padding: 10px;
  border-radius: 10px;

  cursor: pointer;
  background-color: #F3D432;
  font-size: 16px;
}


</style>