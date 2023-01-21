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
    // grabs single user according to id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({message: 'This user id does not exist'})
                }
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

}