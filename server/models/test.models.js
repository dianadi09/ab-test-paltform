const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
//const validator = require('validator')

const testSchema = new Schema({
    _id: ObjectId,
    owner: {type: String, required: true},
    mainVersion: {type: String, required: true},
    candidateVersion: {type: String, required: true},
    candidatePercentage: {type: String, required: true},
    startDate: Date,
});

module.exports = mongoose.model('Test', testSchema, 'tests');