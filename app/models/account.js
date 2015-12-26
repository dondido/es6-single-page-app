var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    email: { 
        type: String, 
        required: true, 
        lowercase:true, 
        index: {unique: true} 
    },
    username: {type: String, required: true},
    created: {type: Date, default: Date.now},
});

Account.plugin(passportLocalMongoose, {usernameField: 'email'});

Account.statics.updatePassword = function(user, password, cb) {

    /* This instance method resets forgotten user password by invoking
    setPassword(password, cb) instance method to set a user's password
    hash and salt in the databease. */
    user.setPassword(
        password,
        function(err, user){
            /* Using setPassword() will only update the document's password
            fields, but will not save the user data. To commit changes, we
            use Mongoose's document.save().*/
            user.save(function(err){
                if (err){
                    console.log('Failed to save the password');
                } else {
                    console.log('Password reset!');
                }
                cb();
            });
        }
    );
};

module.exports = mongoose.model('Account', Account);