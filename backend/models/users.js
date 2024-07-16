const mongoose = require('mongoose')
const { USER_ROLES } = require('../constants/users')
const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema


const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    dateStarted: { type: Date, required: true, trim: true },
    salary: { type: Number, required: true, trim: true },
    userRole: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.WORKER },
    responsibleManager: { type: Object }
  },
  { strict: false, autoCreate: true, timestamps: true }
);

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema