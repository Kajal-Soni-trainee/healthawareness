const {redisConfig} = require('../config/redisConfig');
const {Queue} = require("bullmq");

exports.emailQueue = new Queue('email',{connection:redisConfig});
exports.reportQueue = new Queue('report', {connection:redisConfig});