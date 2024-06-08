<template>
  <div class="container main">
    <H1 class="text-center">Login</H1>
    <form>
    <label for="email" class="form-label">email</label>
    <input
      type="text"
      id="email"
      name="email"
      v-model="email"
      class="form-control"
    />
    <label for="pass" class="form-label">Password</label>
    <input
      type="password"
      id="pass"
      name="pass"
      v-model="pass"
      class="form-control"
    />
    <label for="cpass" class="form-label">Password</label>
    <input
      type="password"
      id="cpass"
      name="cpass"
      v-model="cpass"
      class="form-control"
    />
    <div class="p-2 d-flex justify-content-center align-item-center">
      <input
        type="button"
        v-on:click="getInputData()"
        class="btn btn-primary"
        value="Login"
      />
    </div>
  </form>
  </div>

</template>
<script>
const {axiosPost} = require('../services/service');
export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
      cpass: "",
    };
  },
  methods: {
    async getInputData() {
      let isPassSame = this.validatePassword(this.email,this.pass, this.cpass);

      if (isPassSame) {
     let result = await axiosPost('login',{
      email:this.email,
      pass:this.pass
     });
     if(result.status==200){
    this.$router.push({name:"setSchedule"});  
    alert("user logged in successfully");
       }
      }
    },
    validatePassword(email,pass1, pass2) {
      if(email==""|| pass1=="" || pass2==""){
      alert("please enter all values");
      return false;
      }
      if (pass1 === pass2) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
.main{
  margin-top:200px;
  width:350px;
  border:2px solid black;
  padding:20px;
}</style>
