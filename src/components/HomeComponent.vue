<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/usermenu">User</router-link>
    <router-link to="/signin">Sign In</router-link>
    <router-link to="/signup">Sign Up</router-link>
  </nav>
</template>

<script>
import router from "@/rooter";

export default {
  name: "HomeComponent",
  mounted() {
    if(!sessionStorage.getItem('token')){
      router.push("/signup");
    } else {
      router.push("/usermenu");
    }
  }
}
</script>

<style scoped>

</style>