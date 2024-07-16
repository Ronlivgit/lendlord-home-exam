const UsersRepo = require('../repository/users')


class Users {
  async initialize() {
    this.repo = new UsersRepo()
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query)
    return user
  }

  async getAllUsers(query,projection = {}){
    const users = await this.repo.findAllUsers(query)
    return users
  }

  async createUser(payload) {
    const newUser = await this.repo.createOne(payload)
    return newUser
  }

  async findByUserID(query){
    const user = await this.repo.findById(query)
    console.log("findByUserID : " , user)
    return user
  }

  async getManagers(){
    const managers = await this.repo.findManagers()
    return managers
  }
}


module.exports = Users