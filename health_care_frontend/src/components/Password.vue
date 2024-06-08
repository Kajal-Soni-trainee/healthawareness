<template>
  <div class="container main">
    <h1 class="text-center">Create Your Password Here !</h1>
    <form>
      <label for="email" class="form-label" >Email</label>
      <input type="text" id="email" v-model="email" class="form-control" />
      <label for="pass" class="form-label">Password</label>
      <input type="password" id="pass" v-model="pass" name="pass" class="form-control" />
      <div class="p-2 d-flex justify-content-center align-item-center">
        <input type="button" v-on:click="createPassword()" class="btn btn-primary" value="Create Password" />
      </div>
    </form>
  </div>
</template>
<script>
const {axiosPost} = require('../services/service');
export default {
  name: "password",
  data(){
    return {
      email:"",
      pass:"",
      user_id:this.$route.params.user_id,
    }
  },
  methods:{
   async createPassword(){
      if(this.email=='' || this.pass==''){
        alert("please enter both email and password");
      }
      else{
      let result = await axiosPost('createPass',{
       id:this.user_id,
       email:this.email,
       pass:this.pass
      });
      if(result.status==200){
        alert("password created successfully");
        this.$router.push({name:"login"});
      }
      }
    }
  }
};
</script>
<style scoped>
.main {
  width: 350px;
  border: 2px solid black;
  margin-top: 200px;
}
</style>
