const mongoose = require('mongoose')
const { USER_ROLES } = require('../constants')

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateStarted: { type: Date },
    salary: { type: Number },
    role: {
      type: String,
      default: USER_ROLES.CLIENT,
      enum: Object.values(USER_ROLES),
      index: true
    },
    managerId: { type: String }
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
