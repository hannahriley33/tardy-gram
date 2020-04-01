  
const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 15, postsToCreate = 25, commentsToCreate = 20 } = {}) => {
  const loggedInUser = await User.create({
    username: 'pajamas',
    password: 'pajamasallday'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.name()
  })));

  const posts = await Post.create([...Array(postsToCreate)].slice(1).map(() => ({
    caption: chance.sentence(),
    photoUrl: chance.url(),
    tags: [chance.animal(), chance.animal(), chance.word()],
    user: chance.pickone(users)
  })));

  await Post.create([...Array(postsToCreate)].map(() => ({
    caption: chance.sentence(),
    photoUrl: chance.url(),
    tags: [chance.animal(), chance.animal(), chance.word()],
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    commentBy: chance.pickone(users),
    post: chance.pickone(posts),
    comment: chance.sentence()
  })));
};
