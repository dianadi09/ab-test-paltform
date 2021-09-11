const {successRes, errorRes} = require('../common/response')
const configsService = require('../services/configs.services')

exports.createConfigs = async function (req, res, next) {
    configsService.createConfigs(req)
        .then(successRes(res))
        .catch((err) => errorRes(res, err));
}

exports.getConfigs = async function (req, res, next) {
    configsService.getConfigs(req)
        .then(configs => successRes(res, configs))
        .catch((err) => errorRes(res, err));
}

exports.updateConfigs = async function (req, res, next) {
    configsService.updateConfigs(req)
        .then(successRes(res))
        .catch((err) => errorRes(res, err));
}


