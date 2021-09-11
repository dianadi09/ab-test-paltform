const {successRes, errorRes} = require('../common/response')
const History = require('../models/history.models')

exports.getHistory = async function (req, res, next) {
    await History.find().then(history => successRes(res, history))
        .catch((err) => errorRes(res, err));
}

