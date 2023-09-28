const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoguhts = await Thought.find()
            .select('-__v');

            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thoughtData) {
                res.status(404).json({ message: 'Thought with that ID does not exist!' })
            }

            res.status(200).json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            thoughtData.thoguhtText = req.body.thoguhtText;
            res.status(200).json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            thoughtData.save();
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                {$addToSet: { thougths: thoughtData._id }},
                { new: true })
            res.status(200).json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!thoughtData) {
                res.status(404).json({ message: 'Thought not found!'})
            }
            res.status(200).json({ message: 'Though Deleted!' })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req,res){
        try{
            if (!req.body.reactionBody || !req.body.username ){
                return res.status(400).json({message: "must have reaction body and username"});
            }
            const reaction ={
                reactionBody: req.body.reactionBody,
                username: req.body.username
            };
            const thought = await Thought.findByIdAndUpdate({_id: req.params.thoughtId},
                {$addToSet: {reactions: reaction }},
                {new: true});
            res.status(200).json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.body.reactionId} } },
                { new: true })
            res.status(200).json({message:"reaction removed!"})
        }catch(err){
            res.status(500).json(err);
        }
    }
}