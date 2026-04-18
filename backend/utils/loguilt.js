const Log = require('../models/Log');
const user = require('../models/User');

const generatelog = (user , action) =>{
    return Log.create({
        userId : user._id,
        action : action
    });
}

module.exports = generatelog;