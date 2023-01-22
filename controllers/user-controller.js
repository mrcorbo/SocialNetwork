const { User, Thought } = require('../models')

const userController = {
    // grabs all users
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // grabs single user according to id and all corresponding thoughts & friends
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This user id does not exist' })
                }
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // Create new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // Update existing user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                runValidators: true,
                new: true,
            }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This user id does not exist' })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // delete user 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This user id does not exist' });
                }
            })
            .then(() => {
                res.json({ message: 'User deleted' })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // Add friend to user's friendlist
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This user id does not exist' });
                }
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // delete friend from user's friendlist
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This user id does not exist' });
                }
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User has been deleted and all their thoughts have left too'})
            })   
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}

module.exports = userController