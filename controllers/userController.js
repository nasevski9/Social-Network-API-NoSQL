const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
        const userData = await User.find();
        res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select('-__v') 
                .populate('thoughts')
                .populate('friends')
            
            if (!userData) {
                res.status(404).json({ message: 'User with that ID does not exist!'})
            }

            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.status(200).json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req,res) {
        try {
            const userData = await User.findOneAndRemove({ _id: req.params.userId})
            
            if (!userData) {
                res.status(404).json({ message: 'User with that ID does not exist!' })
            }

            const thoughtDelete = await Thought.deleteMany({ userId: req.params.userId })
            
            req.status(200).json({ message: 'User Deleted!'})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            
            if (req.body.email) {
                userData.email = req.body.email
            }
            
            if (req.body.username) {
                userData.username = req.body.username
            }

            await userData.save();
            res.status(200).json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addFriend(req,res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async deleteFriend(req,res){
        try{
            const deletedFriend = await User.findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true });
            res.status(200).json({message:"friend removed!"})
        }catch(err){
            res.status(500).json(err);
        }
    }
}