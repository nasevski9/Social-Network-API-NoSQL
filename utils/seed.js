// Need seed data --> either JS objects or a JSON file
const { names, possibleThoughts, possibleReactions, generateReaction } = require('./data');
// Require in your models
const { User, Thought } = require('../models');
// require the seed data into the seed file
const connection = require('../config/connection');
// connect to the database
connection.on('error', (err) => err);

connection.once('open', async () => {
    // Drop the relevant collections
    await User.deleteMany({});
    await Thought.deleteMany({});
    // Create the parent collections (User)
    let users = names.map(name => ({ username: name, email: `${name.toLowerCase()}@gmail.com`, thoughts: [] }));
    await User.collection.insertMany(users);
    users = await User.find({});
    // If you have related data, iterate over the data (thoughts) and for each, generate a (random number * the length of the user array)
    for (let i = 0; i < possibleThoughts.length; i++) {
        const index = Math.floor(Math.random() * users.length);
        // Find the user at that index
        const randomUser = users[index];

        // Insert that user's _id OR username into that thought doc    
        const thought = new Thought({
            thoughtText: possibleThoughts[i],
            username: randomUser.username,
            userId: randomUser._id,
            reactions: generateReaction()
        });
        await thought.save();
        // Find and update the user whose _id or username was just inserted as the creator of the thought
        randomUser.thoughts.push(thought._id);
        await randomUser.save();
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);
});

// End the seed process with process.exit(0)