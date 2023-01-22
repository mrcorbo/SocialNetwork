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

    },

    createThought(req,res) {

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