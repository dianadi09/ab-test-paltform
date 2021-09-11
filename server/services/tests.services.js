const ConfigsService = require('./configs.services')
const HistoryService = require('./history.services');
const mongoose = require('mongoose')
const Test = require('../models/test.models');

exports.createTest = async function (req) {
    let body = req.body;
    //get main version from configs
    const configs = await ConfigsService.getConfigs();
    let configData = configs[0];
    let updateMainPercentage = configData.main.currentPercentage - Number(body.candidatePercentage);
    if(updateMainPercentage < process.env.MAIN_MIN_PERCENTAGE) {
        throw Error("Main percentage below the minimum");
    }
    configData.main.currentPercentage = updateMainPercentage;
    await configData.save();

    const data = {
        _id: new mongoose.Types.ObjectId(),
        owner: body.owner,
        mainVersion: configData.main.version,
        candidateVersion: body.candidateVersion,
        candidatePercentage: Number(body.candidatePercentage),
        startDate: new Date()
    }

    const newTest = new Test(data);
    return newTest.save();
}

exports.getTests = async function (req={}) {
    let tests = [];
    if(req.params && req.params.id) {
        await Test.findById(req.params.id)
            .then(test => {tests.push(test)});
    } else {
        tests = await Test.find()
    }
    return tests;
}

exports.updateTest = async function (req) {
    Test.findById(req.params.id)
        .then(test => {
            //only those actions are permitted
            test.candidatePercentage = req.body.candidatePercentage;
            return test.save();
        });
}

exports.finishTest = async function (req={}) {
    const test = await Test.findById(req.params.id);
    await HistoryService.saveTest(test);

    await Test.findOneAndDelete({ _id: req.params.id }).then(async ()=> {
        //update main current percentage
        await ConfigsService.updateMainPercentageWhenTestFinished(req, test.candidatePercentage);
    });
}