<template>
  <div class="divCon container">
    <div class="container maincon p-5">
      <h1 class="text-center">Set Your Medicine Schedule</h1>
      <form>
        <label for="name" class="form-label">Medicine Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          v-model="name"
        />
        <label for="desc" class="form-label">Medicine Description</label>
        <input
          type="text"
          class="form-control"
          id="desc"
          name="desc"
          v-model="desc"
        />
        <label for="time" class="form-label">Medicine Time</label>
        <input
          type="text"
          class="form-control"
          id="time"
          name="time"
          v-model="time"
        />
        <label class="form-label">Medication Type</label>
        <select
          name="medi_type"
          v-on:change="onChangeFunc()"
          class="form-control"
          v-model="medi_type"
        >
          <option id="0" value="0" selected>Only Once</option>
          <option id="1" value="1">Daily</option>
          <option id="2" value="2">Weekly</option>
        </select>
        <div id="type0" style="visibility: collapse" class="d-flex flex-row">
          <label class="label">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            v-model="date"
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div
          id="type1"
          style="visibility: collapse"
          class="d-flex flex-row pt-2"
        >
          <div>
            <label class="form-label" for="start_date">Start Date</label>
            <input
              type="text"
              id="start_date"
              v-model="start_date"
              placeholder="yyyy-mm-dd"
            />
          </div>
          <div>
            <label class="form-label" id="end_date">End Date</label>
            <input
              type="text"
              id="end_date"
              v-model="end_date"
              placeholder="yyyy-mm-dd"
            />
          </div>
        </div>
        <div id="type2" style="visibility: collapse" class="d-flex flex-row">
          <div>
            <label class="form-label" for="start_date">Start Date</label>
            <input
              type="text"
              id="start_date"
              v-model="start_date"
              placeholder="yyyy-mm-dd"
            />
          </div>
          <div>
            <label class="form-label" id="end_date">End Date</label>
            <input
              type="text"
              id="end_date"
              v-model="end_date"
              placeholder="yyyy-mm-dd"
            />
          </div>
          <div>
            <label>Medication Day</label>
            <select name="day" v-model="day">
              <option id="day1" selected value="0">Sunday</option>
              <option id="day2" value="1">Monday</option>
              <option id="day3" value="2">Tuesday</option>
              <option id="day4" value="3">Wednessday</option>
              <option id="day5" value="4">Thursday</option>
              <option id="day6" value="5">Friday</option>
              <option id="day7" value="6">Saturday</option>
            </select>
          </div>
        </div>
        <div class="container d-flex justify-content-center">
          <input
            v-on:click="update()"
            type="button"
            value="Add Schedule"
            class="btn btn-primary"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
const {axiosPost, axiosGet} = require('../services/service');
export default {
data(){
    return{
    name: "",
      desc: "",
      medi_type:this.$route.params.medi_type,
      date: "",
      start_date: "",
      end_date: "",
      time: "",
      day: "",
      medi_id:this.$route.params.medi_id
    }
},
methods:{
    async update(){
    let result = await axiosPost('updateSchedule',{
       medi_id:this.medi_id,
       medi_type:this.medi_type,
       name:this.name,
        desc:this.desc,
        date:this.date,
        start_date:this.start_date,
        end_date:this.end_date,
        time:this.time,
        day:this.day,
    });
    if(result.status==200){
        alert("Medication schedule updated sucessfully");
        this.$router.back();
    }
}
},
 async mounted(){
    let result = await axiosGet(`getScheduleById/?medi_id=${this.medi_id}&medi_type=${this.medi_type}`);
    if(result.status==200){
    let data = result.data;
     if(this.medi_type==0){
     this.name=data[0].medi_name;
     this.desc=data[0].medi_desc;
     this.time=data[0].medi_time;
     this.date=data[0].medi_date;
     }else if(this.medi_type==1){
     this.name = data[0].medi_name;
     this.desc = data[0].medi_desc;
     this.start_date = data[0].start_date;
     this.end_date = data[0].end_date;
     this.time = data[0].medi_time;
     }else{
     this.name = data[0].medi_name;
     this.desc = data[0].medi_desc;
     this.start_date = data[0].start_date;
     this.end_date = data[0].end_date;
     this.time = data[0].medi_time;
     this.day = data[0].week_day;
     }
}
}
}
</script>
<style scoped></style>
