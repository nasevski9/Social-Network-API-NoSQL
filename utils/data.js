const names = [
    'John',
    'Emily',
    'Alex',
    'Sophia',
    'Michael',
    'Olivia',
    'Daniel',
    'Ava',
    'William',
    'Isabella',
    'Ethan',
    'Mia',

];

const possibleThoughts = [
    'Reflecting on a philosophical question',
    'Musings about the future of technology',
    'Personal thoughts on creativity',
    'Contemplating the meaning of life',
    'Reflecting on recent world events',
    'Thoughts on the importance of empathy',
    'Considering the impact of social media',

];

const possibleReactions = [
    'I appreciate your perspective!',
    'Your thoughts inspired me to think more deeply about this topic',
    'This resonated with me a lot',
    'Thank you for sharing your insights',
    'Your content is so engaging. Keep it up!',
    'Great points, you really opened my mind!',
    'Your analysis is spot on, I couldn\'t agree more.',
    'I\'ve learned something new from your perspective.',
    'You have a knack for explaining complex concepts clearly!',
    'I admire the effort you put into researching and presenting this.',
    'Your content always challenges me to think differently. Thank you!',
];

//generate reactions
const generateReaction = () =>{
    const randomNum = Math.floor(Math.random() * 10) - 1;
    let arrReactions = [];
    for (let i = 0; i < randomNum; i++){

        const indexReaction = Math.floor(Math.random()*possibleReactions.length);
        const indexUser = Math.floor(Math.random()*names.length)

        arrReactions.push({
            reactionBody: possibleReactions[indexReaction],
            username: names[indexUser]
        })
    
    }
    return arrReactions;
}





module.exports = { names, possibleThoughts, possibleReactions, generateReaction }