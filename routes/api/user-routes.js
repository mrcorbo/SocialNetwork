const router = require('express').Router
//       
//     getUsers,
//     getSingleUser,
//     createUser,
//     updateUser,
//     deleteUser,

// routes
// Get all users /api/users
router.route('/').get(getUsers).post(createUser)

// Get single user /api/users:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
