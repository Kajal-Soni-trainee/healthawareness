<template>
    <div class="con container d-flex flex-column justify-content-center">
        <H1 class="text-center text-primary">Medication Details</H1>
        <table class="mytable">
          <th>Medicine Name</th>
          <th>Medicine Description</th>
          <th>Is Medicine Taken</th>
          <th>Date</th>
          <tr v-for="item in data" :key="item.id">
         <td>{{ name }}</td>
         <td>{{ desc }}</td>
         <td v-if="item.isTaken==0">No</td>
         <td v-else>Yes</td>
         <td>{{ item.createdAt }}</td>
          </tr>
        </table>
    </div>
</template>
<script>
import { axiosGet} from '../services/service';
export default{
    name:"showDetails",
    data(){
        return{
    user_id:this.$route.params.user_id,
    medi_id:this.$route.params.medi_id,
    medi_type:this.$route.params.medi_type,
    name:this.$route.params.name,
    desc:this.$route.params.desc,
    data:[]
        }
    },
   async  mounted(){
    let result = await axiosGet(`getNotiById/?user_id=${this.user_id}&medi_id=${this.medi_id}&medi_type=${this.medi_type}`);
     if(result.status==200){
        this.data = result.data;
     }
    console.log("user_id : "+this.user_id,"medi_id : "+this.medi_id , "medi_type : "+this.medi_type);
    }
}
</script>
<style scoped>
.con{
    margin-top:100px;
}
.mytalbe{
  margin-top:50px;
}
td{
    border:2px solid black;
    padding:10px;
    text-align:center;
}

</style>