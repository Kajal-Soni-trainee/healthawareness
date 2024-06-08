const { Worker } = require("bullmq");
const { redisConfig } = require("../config/redisConfig");
const {
  sendReminderMail,
  sendReportMail,
} = require("../middlewares/sendEmail");
const PORT = process.env.PORT;
exports.emailWorker = new Worker(
  "email",
  async (job) => {
    console.log("job");
    const { id, email, msg } = job.data;
    await sendReminderMail(
      email,
      msg,
      `<a href="http://localhost:${PORT}/takenMedi//id=${id}">I have taken medicine</a>`
    );
  },
  { connection: redisConfig }
);

exports.reportWorker = new Worker(
  "report",
  async (job) => {
    const { email, filePath } = job.data;
    await sendReportMail(email, filePath);
  },
  { connection: redisConfig }
);
