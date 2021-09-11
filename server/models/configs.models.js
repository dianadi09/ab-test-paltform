const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const configsSchema = new Schema({
    _id: ObjectId,
    name: {type: String, required: true},
    main: {
        version: {type: String, required: true},
        currentPercentage: {type: Number, required: true},
        minPercentage: Number
    },
    general: {
        abTestsEnabled: Boolean
    }
});

module.exports = mongoose.model('Configs', configsSchema, 'configs');