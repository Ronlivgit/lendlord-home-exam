const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }

  async findAllUsers(query , projection = {}){
    const users = await usersModel.find(query).select(projection)  
    return users
  }

  async createOne(payload){
    const newUser = new usersModel(payload)
    return newUser
  }

  async findById(query) {
    const user = await usersModel.findById(query)
    console.log("findById : " , user)
    return user
  }

  async findManagers(query){
    const managers = await usersModel.find({userRole : "manager"})
    return managers
  }
}

module.exports = Users