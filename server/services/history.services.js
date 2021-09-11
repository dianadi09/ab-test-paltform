const History = require('../models/history.models')
const ConfigsService = require('./configs.services')
const mongoose = require('mongoose')

exports.saveTest = async function (test={}) {
    const endDate = new Date();
    const configs = await ConfigsService.getConfigs();
    let historyObject = {
        _id: new mongoose.Types.ObjectId(),
        owner: test.owner,
        startDate: test.startDate,
        testDuration: endDate - test.startDate,
        mainPercentage: configs[0].main.currentPercentage,
        mainVersion:  test.mainVersion,
        candidateVersion: test.candidateVersion,
        candidatePercentage: Number(test.candidatePercentage),
    };
    //move finished test to history collection
    const newTest = new History(historyObject);
    return await newTest.save();
}