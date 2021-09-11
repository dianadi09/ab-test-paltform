const Configs = require('../models/configs.models')
const mongoose = require('mongoose')

exports.createConfigs = async function (req={}) {
    let body = req.body;
    const data = {
        _id: new mongoose.Types.ObjectId(),
        name: body.name || process.env.CONFIGS_NAME,
        main: {
            version: body.main.version,
            minPercentage: body.main.minPercentage || process.env.MAIN_MIN_PERCENTAGE,
            currentPercentage: 100 //default
        }
    }

    const newTest = new Configs(data);
    return newTest.save();
}

exports.updateConfigs = async function (req) {
    await Configs.findById(req.params.id)
        .then(configs => {
            //only those actions are permitted
            configs.name = req.body.name;
            let mainConfigs = req.body.main;
            configs.main.version = mainConfigs.version;
            configs.main.currentPercentage = mainConfigs.currentPercentage;
            configs.main.minPercentage = mainConfigs.minPercentage;
            return configs.save();
        });
}

exports.getConfigs = async function (req={}) {
    let configs = [];
    if(req.params && req.params.id) {
        if(req.params.id === 'main') {
            let config = req.params && req.params.name ?  await Configs.findOne(req.params.name) :  await Configs.findOne({name: process.env.CONFIGS_NAME});
            configs.push(config.main);
        } else {
            await Configs.findById(req.params.id)
                .then(config => {configs.push(config)});
        }
    } else {
        let config = req.params && req.params.name ?  await Configs.findOne(req.params.name) :  await Configs.findOne({name: process.env.CONFIGS_NAME});
        configs.push(config);
    }
    return configs;
}


exports.updateMainPercentageWhenTestFinished = async function (req={}, newTestPercentage) {
    let configs = req.params && req.params.name ?  await Configs.findOne(req.params.name) :  await Configs.findOne({name: process.env.CONFIGS_NAME});
    configs.main.currentPercentage += Number(newTestPercentage);
    await configs.save();
    return true;

}