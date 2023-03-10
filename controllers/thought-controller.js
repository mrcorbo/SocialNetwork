const { Thought } = require('../models/Thought')
const { User } = require('../models/User')

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
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).jason({ message: 'This thought has run away and cannot be found'})
                }
                res.json(dbThoughtData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteThought(req,res) {
        Thought.FindOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).jason({ message: 'This thought has run away and cannot be found'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).jason({ message: 'This thought has run away and cannot be found'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    removeReaction(req,res) {
        Thought.FindOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).jason({ message: 'This thought has run away and cannot be found'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
}

module.exports = thoughtController