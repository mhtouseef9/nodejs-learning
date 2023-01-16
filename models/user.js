// module.exports = (mongoose => {
//     const User = mongoose.model(
//         "user",
//         mongoose.Schema(
//             {
//                 name: String,
//                 email: String,
//                 isConfirmed: Boolean
//             },
//             { timestamps: true }
//         )
//     );
//     return User;
// })();
//--------------------------------------------------------------------------
var mongoose=require('mongoose');
var User = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    is_confirmed: Boolean
});
module.exports = mongoose.model(
    'users', User, 'users');
