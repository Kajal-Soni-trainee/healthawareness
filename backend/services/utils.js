const {users,daily_medi,notification,once_only,weekly_medi} = require('../models');

const findAllUsers = async ()=>{
    let result = await users.findAll({
        raw:true
});
if(result){
    return result
}
}

const findUserEmail = async (user_id)=>{
    let result = await users.findAll({
        where:{
            id:user_id
        },
        raw:true
    });
    if(result){
        return result[0].email
    }
}
module.exports = {findAllUsers, findUserEmail};