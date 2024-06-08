<template>
  <div class="divCon container">
    <div class="">
      <h4 v-on:click="logout()" class="text-primary pr-5">Logout</h4>
      <h4 v-on:click="showAllSchedules()" class="text-primary pl-5">
        Show All Schedules
      </h4>
    </div>
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
            v-on:click="setSchedule()"
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
const { axiosPost, axiosGet } = require("../services/service");
export default {
  name: "setSchedule",
  data() {
    return {
      name: "",
      desc: "",
      medi_type: "",
      date: "",
      start_date: "",
      end_date: "",
      time: "",
      day: "",
    };
  },
  methods: {
    onChangeFunc() {
      if (this.medi_type != "" && this.medi_type == 0) {
        document.getElementById("type0").style.visibility = "visible";
        document.getElementById("type1").style.visibility = "collapse";
        document.getElementById("type2").style.visibility = "collapse";
      } else if (this.medi_type != "" && this.medi_type == 1) {
        document.getElementById("type1").style.visibility = "visible";
        document.getElementById("type0").style.visibility = "collapse";
        document.getElementById("type2").style.visibility = "collapse";
      } else if (this.medi_type != "" && this.medi_type == 2) {
        document.getElementById("type2").style.visibility = "visible";
        document.getElementById("type0").style.visibility = "collapse";
        document.getElementById("type1").style.visibility = "collapse";
      }
    },
    async setSchedule() {
      let medi_obj = {};
      if (this.medi_type == 0) {
        medi_obj = {
          name: this.name,
          desc: this.desc,
          date: this.date,
          time: this.time,
          type: this.medi_type,
        };
      } else if (this.medi_type == 1) {
        medi_obj = {
          name: this.name,
          desc: this.desc,
          start_date: this.start_date,
          end_date: this.end_date,
          time: this.time,
          type: this.medi_type,
        };
      } else if (this.medi_type == 2) {
        medi_obj = {
          name: this.name,
          desc: this.desc,
          start_date: this.start_date,
          end_date: this.end_date,
          time: this.time,
          day: this.day,
          type: this.medi_type,
        };
      }
      console.log(medi_obj);
      let result = await axiosPost("addSchedule", medi_obj);
      if (result.status == 200) {
        alert(
          "your medication has been scheduled successfully and you will be send email notification at scheduled time"
        );
      }
    },
    async showAllSchedules() {
      this.$router.push({ name:"showSchedules"});
    },
    async logout() {
      let result = await axiosGet("logout");
      if (result.status == 200) {
        alert("user logged out success fully");
        this.$router.replace({ name: "login" });
      }
    },
  },
};
</script>
<style scpoed>
.divCon {
  margin-top: 200px;
}
.maincon {
  border: 5px solid black;
  width: 200px;
}
#type0 {
  padding-top: 10px;
}
</style>
