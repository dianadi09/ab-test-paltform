const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const historySchema = new Schema({
    _id: ObjectId,
    owner: {type: String, required: true},
    mainVersion: {type: String, required: true},
    candidateVersion: {type: String, required: true},
    candidatePercentage: {type: Number, required: true},
    startDate: Date,
    testDuration: Number
});

module.exports = mongoose.model('History', historySchema, 'history');