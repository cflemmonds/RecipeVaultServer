const UserModel = require('./user');
const PantryModel = require('./pantry');
const PostsModel = require('./posts');
const CommentsModel = require('./comments');

UserModel.hasMany(PostsModel);
UserModel.hasMany(CommentsModel);

PostsModel.belongsTo(UserModel);
PostsModel.hasMany(CommentsModel);

CommentsModel.belongsTo(PostsModel);


module.exports = {
    UserModel,
    PantryModel,
    PostsModel,
    CommentsModel
};
