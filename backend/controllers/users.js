const { ObjectId } = require("mongodb");
const Users = require("../lib/users");
const { praseDate } = require("../constants/users");
const users = new Users();


/**
 * Gets user by id
 */
exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await users.findUser({ _id: new ObjectId(id) });

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.getAllUsers = async (ctx) => {
  await initialize();
  try {
    const allUsers = await users.getAllUsers();
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (error) {
    console.error("error : " , error)
    ctx.status = error.status || 500;
    ctx.message = error.message || "internal server error";
  }
};

exports.createUser = async (ctx) => {
  const { firstName , lastName , email , dateStarted , salary , userRole , responsibleManager } = ctx.request.body
  try {
    const formatDate = praseDate(dateStarted)
    const appliedManager = await users.getManagers()
    const newUser = await users.createUser({
      firstName,
      lastName,
      email,
      dateStarted : formatDate,
      salary,
      userRole,
      responsibleManager : userRole === "manager" ? null : appliedManager[0]
    })
    await newUser.save()
    ctx.status = 200
    ctx.body = newUser
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.message = error.message || "internal server error";
  }
}
exports.updateUser = async(ctx) => {
  const {id} = ctx.params
  const { firstName, lastName, email, dateStarted, salary } = ctx.request.body;
  try {
    const user = await users.findByUserID(id);
    if(!user){
      ctx.status = 404
      ctx.body = "User doesn't exist."
      return
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (dateStarted) user.dateStarted = dateStarted;
    if (salary) user.salary = salary;

    await user.save();
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.message = error.message || "internal server error";
  }
}

exports.deleteUser = async(ctx) => {
  const {id} = ctx.params
  try {
    const user = await users.findByUserID(id)
    if(!user){
      ctx.status = 404
      ctx.body = "User doesn't exist."
      return
    }
    await user.remove()

    ctx.status = 200
    ctx.body = {message : "User deleted Successfully." , user }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.message = error.message || "internal server error";
  }
}


exports.getManagerAndEmployees = async(ctx) => {
  const {managerId} = ctx.params
  try {
    const manager = await users.findByUserID(managerId)
    if(!manager){
      ctx.status = 404
      ctx.body = "Manager doesn't exist."
      return
    }
    const managerUsers = await users.getAllUsers({responsibleManager : managerId})
    if(!managerUsers){
      ctx.status = 404
      ctx.body = "Manager have no users."
      return
    }
    
    ctx.status = 200
    ctx.body = {manager : manager , employees : managerUsers}
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.message = error.message || "internal server error";
  }
}


async function initialize() {
  await users.initialize();
}

initialize();
