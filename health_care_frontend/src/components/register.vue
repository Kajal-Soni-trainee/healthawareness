
<template>
  <div class="container maincon border border-dark">
    <h1 class="text-center">Register Here!</h1>
    <form>
      <label for="name" class="form-label">User Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="name"
        name="name"
      />
      <label for="email" class="form-label">Email</label>
      <input
        type="text"
        class="form-control"
        id="email"
        v-model="email"
        name="email"
      />
      <div class="container p-3 d-flex justify-content-center">
        <input
          v-on:click="register()"
          class="btn btn-primary"
          id="signup"
          type="button"
          value="Sign Up"
        />
      </div>
    </form>
  </div>
</template>
<script>
const {axiosPost} = require('../services/service.js');
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    async register() {
      try {
        console.log("object :>> regisrterererer");
        if (this.email !== "" && this.name !== "") {
          console.log("name " + this.name + ":" + "email " + this.email);
          let result = await axiosPost('register',{name:this.name, email:this.email});
          console.log("status code " + result.status);
          if(result.status==200){
            let user_id=result.data.id
            console.log(user_id);
       this.$router.push({name:"password",params:{user_id}});
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    },
  },
};
</script>
<style scoped>
.maincon {
  margin-top: 200px;
  width: 500px;
}
</style>
