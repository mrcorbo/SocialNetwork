const router = require('express').Router()
      
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller')

// routes
// Get all users/create a user /api/users
router.route('/').get(getUsers).post(createUser)

// Get/update/delete single user /api/users:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// Get/add/delete friend /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
