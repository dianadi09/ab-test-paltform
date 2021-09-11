const {successRes, errorRes} = require('../common/response')
const testsService = require('../services/tests.services')

exports.createTest = async function (req, res, next) {
    testsService.createTest(req)
        .then(successRes(res))
        .catch((err) => errorRes(res, err));
}

exports.getTests = async function (req, res, next) {
    testsService.getTests(req)
        .then(tests => successRes(res, tests))
        .catch((err) => errorRes(res, err));
}

exports.updateTest = async function (req, res, next) {
    testsService.updateTest(req)
        .then(successRes(res))
        .catch((err) => errorRes(res, err));
}

exports.finishTest = async function (req, res, next) {
    testsService.finishTest(req)
        .then(successRes(res))
        .catch((err) => errorRes(res, err));
}

