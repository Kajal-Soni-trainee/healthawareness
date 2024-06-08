const {
  users,
  once_only,
  weekly_medi,
  daily_medi,
  notification,
} = require("../models");

let secret_key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const storage = require("../middlewares/multer");
const upload = multer({ storage: storage });
const { findAllUsers, findUserEmail } = require("../services/utils");

const { emailQueue, reportQueue } = require("../services/producer");
const addSchedule = async (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  let token = req.cookies.token;
  let user_id = 1;
  if (token != undefined) {
    let token_arr = jwt.verify(token, secret_key);
    user_id = token_arr.user_id;
  }
  console.log(user_id);
  let medi_name = req.body.name;
  let medi_desc = req.body.desc;
  let medi_time = req.body.time;
  let schedule_type = req.body.type;
  if (schedule_type == 0) {
    let medi_date = req.body.date;
    try {
      let result = await once_only.create({
        user_id: user_id,
        medi_name: medi_name,
        medi_desc: medi_desc,
        medi_time: medi_time,
        medi_date: medi_date,
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  } else if (schedule_type == 1) {
    try {
      let start_date = req.body.start_date;
      let end_date = req.body.end_date;
      let result = await daily_medi.create({
        user_id: user_id,
        start_date: start_date,
        end_date: end_date,
        medi_name: medi_name,
        medi_desc: medi_desc,
        medi_time: medi_time,
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  } else {
    let day = req.body.day;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    try {
      let result = await weekly_medi.create({
        week_day: day,
        start_date: start_date,
        end_date: end_date,
        medi_time: medi_time,
        medi_name: medi_name,
        medi_desc: medi_desc,
        user_id: user_id,
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};

const notiById = async (req, res) => {
  // let token = req.headers.cookie.split("=")[1];
  // let token_arr = jwt.verify(token, secret_key);
  // let user_id = token_arr.user_id;
  let user_id = req.query.user_id;
  let medi_id = req.query.medi_id;
  let medi_type = req.query.medi_type;
  try {
    let result = await notification.findAll({
      where: {
        user_id: user_id,
        medi_id: medi_id,
        medi_type: medi_type,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const markAsDone = async (req, res) => {
  let noti_id = req.query.id;
  try {
    let result = await notification.update(
      { isTaken: 1 },
      {
        where: {
          id: noti_id,
        },
        raw: true,
      }
    );
    console.log(result);
    res.json("Data updated successfully");
  } catch (err) {}
};

const generateReport = async () => {
  const filepath =
    "/home/kajal-soni/Documents/medicalreportcsv/" + Date.now() + ".csv";
  const current_date = new Date();
  let firstDay = current_date.getDate() - current_date.getDay();
  let lastDay = firstDay + 6;
  let firstDate = new Date(current_date.setDate(firstDay)).toUTCString();
  let lastDate = new Date(current_date.setDate(lastDay)).toUTCString();
  console.log(firstDate);
  let csvData =
    "Medicine name , Medicine desc , is medicine taken, Date , Time\n";
  let allUsers = await findAllUsers();
  allUsers.forEach(async (element) => {
    let medi_records = await notification.findAll({
      where: {
        user_id: element.id,
        createdAt: {
          [Op.between]: [firstDate, lastDate],
        },
      },
      raw: true,
    });

    let new_medi_record = await Promise.all(
      medi_records.map(async (medi) => {
        if (medi.medi_type == 0) {
          let result = await once_only.findAll({
            where: {
              id: medi.medi_id,
            },
            raw: true,
          });
          return {
            ...medi,
            name: result[0].medi_name,
            desc: result[0].medi_desc,
            time: result[0].medi_time,
          };
        } else if (medi.medi_type == 1) {
          let result = await daily_medi.findAll({
            where: {
              id: medi.medi_id,
            },
            raw: true,
          });
          return {
            ...medi,
            name: result[0].medi_name,
            desc: result[0].medi_desc,
            time: result[0].medi_time,
          };
        } else {
          let result = await weekly_medi.findAll({
            where: {
              id: medi.medi_id,
            },
            raw: true,
          });
          return {
            ...medi,
            name: result[0].medi_name,
            desc: result[0].medi_desc,
            time: result[0].medi_time,
          };
        }
      })
    );
    console.log(new_medi_record);
    new_medi_record.forEach((data) => {
      csvData += `${data.name},${data.desc},${
        data.isTaken
      },${data.createdAt.toUTCString()},${data.time}\n`;
    });
    console.log(element.id);
    let email = await findUserEmail(element.id);
    console.log(email);
    fs.writeFile(filepath, csvData, (err) => {
      if (err) console.log(err);
      else {
        console.log("data saved");
      }
    });
    reportQueue.add(
      "report",
      {email: email, filepath: filepath },
      { removeOnComplete: true, removeOnFail: true }
    );
  });
};

const showAllScheduleById = async (req, res) => {
  let token = req.cookies.token;
  let user_id = 1;
  if (token != undefined) {
    let token_arr = jwt.verify(token, secret_key);
    user_id = token_arr.user_id;
  }
  let current_timestamp = new Date();
  let date = 0;
  let month = 0;
  let year = 0;
  if (current_timestamp.getDate() < 10) {
    date = "0" + current_timestamp.getDate();
  } else {
    date = current_timestamp.getDate();
  }
  if (current_timestamp.getMonth() < 10) {
    month = "0" + (current_timestamp.getMonth() + 1);
  } else {
    month = current_timestamp.getMonth() + 1;
  }
  year = current_timestamp.getFullYear();
  let current_date = year + "-" + month + "-" + date;
  console.log(current_date);
  if (token != undefined) {
    user_id = token_arr.user_id;
  }
  let result = [];
  let result1 = await once_only.findAll({
    where: {
      user_id: user_id,
      medi_date: {
        [Op.lte]: current_date,
      },
    },
    raw: true,
  });
  let result2 = await daily_medi.findAll({
    where: {
      user_id: user_id,
      end_date: {
        [Op.gte]: [current_date],
      },
    },
    raw: true,
  });

  let result3 = await weekly_medi.findAll({
    where: {
      user_id: user_id,
      end_date: {
        [Op.gte]: [current_date],
      },
      week_day: {
        [Op.lte]: [current_timestamp.getDay()],
      },
    },
    raw: true,
  });
  result.push(result1, result2, result3);
  res.json(result);
};

const deleteSchedule = async (req, res) => {
  let medi_id = req.query.medi_id;
  let medi_type = req.query.medi_type;
  if (medi_type == 0) {
    let result = await once_only.destroy({where:{
      id:medi_id
    }});
    res.json(result);
  } else if (medi_type == 1) {
    let result = await daily_medi.destroy({where:{
      id:medi_id
    }});
    res.json(result);
  } else {
    let result = await weekly_medi.destroy({where:{
      id:medi_id
    }});
    res.json(result);
  }
};
const updateSchedule = async (req,res)=>{
  let user_id=1;
  let medi_type= req.body.medi_type;
  let medi_id = req.body.medi_id;
  let name = req.body.name;
  let desc = req.body.desc;
  let date = req.body.date;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let time = req.body.time;
  let day = req.body.day;
  if(medi_type==0){
  let result = await once_only.update({
    medi_name:name,
    medi_desc:desc,
    medi_date:date,
    medi_time:time
  },{where:{
    id:medi_id
  }});
  res.json(result);
  }
  else if(medi_type==1){
    let result = await daily_medi.update({
      medi_name:name,
      medi_desc:desc,
      start_date:start_date,
      end_date:end_date,
      medi_time:medi_time
    },{where:{
      id:medi_id
    }});
    res.json(result)
  }
  else{
    let result = await weekly_medi.update({
      medi_name:name,
      medi_desc:desc,
      start_date:start_date,
      end_date:end_date,
      week_day:day,
      medi_time:medi_time
    },{where:{
      id:medi_id
    }});
    res.json(result)
  }
}

const getScheduleById = async(req,res)=>{
 let medi_type = req.query.medi_type;
 let medi_id = req.query.medi_id;

 if(medi_type==0){
   let result = await once_only.findAll({
    where:{
      id:medi_id
    },
    raw:true
   });
   res.json(result);
 }
 else if(medi_type == 1){
  let result = await once_only.findAll({
    where:{
      id:medi_id
    },
    raw:true
   });
   res.json(result);
 }
 else{
  let result = await once_only.findAll({
    where:{
      id:medi_id
    },
    raw:true
   });
   res.json(result);
 }
}
module.exports = {
  addSchedule,
  notiById,
  markAsDone,
  generateReport,
  showAllScheduleById,
  deleteSchedule,
  updateSchedule,
  getScheduleById
};
