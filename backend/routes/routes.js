const Router = require('koa-router')
const router = new Router()

const ctrl =  require('../controllers/users')

router.get('/user/:id', ctrl.getUserById)

router.get('/allUsers' , ctrl.getAllUsers)

router.get('/getByManager/:managerId' , ctrl.getManagerAndEmployees)

router.post('/newUser' , ctrl.createUser)

router.patch('/updateUser/:id' , ctrl.updateUser)

router.delete('/deleteUser/:id', ctrl.deleteUser)

router.allowedMethods()

module.exports = router
