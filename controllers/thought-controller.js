const { Thought, User } = require('../models')

const thoughtController = {
    getThoughts(req, res) {
    Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then ((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought exists with that id' })
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    createThought(req,res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: dbThoughtData._id }},
                { new: true }
            )
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'Thought created but no user exists' })
            }
            res.json({ message: 'Thought has been thunk' })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    updateThought(req,res) {

    },
    deleteThought(req,res) {

    },
    addReaction(req,res) {

    },
    removeReaction(req,res) {

    },
}

module.exports = thoughtController