<template>
  <div
    class="container main_container d-flex flex-column justify-content-center"
  >
    <div>
      <h4>Select Schedule Type</h4>
      <Select
        class="form-control"
        v-model="medi_type"
        v-on:change="onChangeFunc()"
        id="medi_type"
        name="medi_type"
      >
        <option selected id="type1" value="0">Only Once</option>
        <option id="type2" value="1">Daily</option>
        <option id="type3" value="2">Weekly</option>
      </Select>
    </div>
    <div id="mytype1">
      <h1 class="text-center text-primary">
        Medicine Scheduled For A Particural Day
      </h1>
      <table class="table">
        <thead class="">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">View Detail</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data1" :key="item.id">
            <td v-on:click="myFunction()">{{ index + 1 }}</td>
            <td>{{ item.medi_name }}</td>
            <td>{{ item.medi_desc }}</td>
            <td>{{ item.medi_date }}</td>
            <td>{{ item.medi_time }}</td>
            <td
              class="btn btn-primary"
              v-on:click="
                showDetails(
                  item.medi_name,
                  item.medi_desc,
                  item.user_id,
                  item.id,
                  0
                )
              "
            >
              Details
            </td>
            <td v-on:click="updateSchedule(item.id, 0)">Update</td>
            <td class="btn btn-danger" v-on:click="deleteSchedule(item.id, 0)">
              Delete
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="mytype2">
      <h1 class="text-center text-primary">
        Medicine Scheduled For Daily basis
      </h1>
      <table class="table">
        <thead class="">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Time</th>
            <th scope="col">View Details</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data2" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.medi_name }}</td>
            <td>{{ item.medi_desc }}</td>
            <td>{{ item.start_date }}</td>
            <td>{{ item.end_date }}</td>
            <td>{{ item.medi_time }}</td>
            <td
              class="btn btn-primary"
              v-on:click="
                showDetails(
                  item.medi_name,
                  item.medi_desc,
                  item.user_id,
                  item.id,
                  1
                )
              "
            >
              Details
            </td>
            <td class="btn btn-warning" v-on:click="updateSchedule(item.id, 1)">
              Update
            </td>
            <td class="btn btn-danger" v-on:click="deleteSchedule(item.id, 1)">
              Delete
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="mytype3">
      <h1 class="text-center text-primary">
        Medicine Schedule On weekly basis
      </h1>
      <table class="table">
        <thead class="">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Day</th>
            <th scope="col">Time</th>
            <th scope="col">View Details</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data3" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.medi_name }}</td>
            <td>{{ item.medi_desc }}</td>
            <td>{{ item.start_date }}</td>
            <td>{{ item.end_date }}</td>
            <td>{{ days[item.week_day] }}</td>
            <td>{{ item.medi_time }}</td>
            <td
              class="btn btn-primary"
              v-on:click="
                showDetails(
                  item.medi_name,
                  item.medi_desc,
                  item.user_id,
                  item.id,
                  2
                )
              "
            >
              Details
            </td>
            <td class="btn btn-warning" v-on:click="updateSchedule(item.id, 2)">
              Update
            </td>
            <td class="btn btn-danger" v-on:click="deleteSchedule(item.id, 2)">
              Delete
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
const { axiosGet } = require("../services/service");
export default {
  name: "showSchedule",
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      index: 0,
      medi_type: "",
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednessday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  methods: {
    onChangeFunc() {
      this.index = 0;
      let type = parseInt(document.getElementById("medi_type").value);
      console.log("on change function called");
      console.log("my type " + type);
      if (type == 0) {
        console.log();
        document.getElementById("mytype1").style.visibility = "visible";
        document.getElementById("mytype2").style.visibility = "collapse";
        document.getElementById("mytype3").style.visibility = "collapse";
      } else if (type == 1) {
        document.getElementById("mytype2").style.visibility = "visible";
        document.getElementById("mytype1").style.visibility = "collapse";
        document.getElementById("mytype3").style.visibility = "collapse";
      } else if (type == 2) {
        document.getElementById("mytype3").style.visibility = "visible";
        document.getElementById("mytype2").style.visibility = "collapse";
        document.getElementById("mytype1").style.visibility = "collapse";
      }
    },
    showDetails(name, desc, user_id, medi_id, medi_type) {
      this.$router.push({
        name: "showDetails",
        params: {
          name: name,
          desc: desc,
          user_id: user_id,
          medi_id: medi_id,
          medi_type: medi_type,
        },
      });
    },
    updateSchedule(medi_id, medi_type) {
      this.$router.push({ name: "updateSchedule", params:{medi_id:medi_id, medi_type:medi_type} });
    },
   async deleteSchedule(medi_id, medi_type) {
      let result = await axiosGet(`deleteSchedule/?medi_id=${medi_id}&medi_type=${medi_type}`);
      if(result.status==200){
        alert("Schedule deleted Successfully");
      }
    },
  },
  async mounted() {
    let result = await axiosGet("showSchedules");
    if (result.status == 200) {
      let myresult = result.data;
      this.data1 = myresult[0];
      this.data2 = myresult[1];
      this.data3 = myresult[2];
      console.log(this.data1);
      console.log(this.data2);
      console.log(this.data3);
    }
    this.onChangeFunc();
  },
};
</script>
<style scoped>
.main_container {
  margin-top: 100px;
}
</style>
