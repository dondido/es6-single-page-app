var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Account = new Schema({
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
//documentation can be found here https://www.npmjs.com/package/mongoose-token
Account.plugin(require('mongoose-token'));
Account.methods.updatePassword = function(password, cb) {
    /* This instance method resets forgotten user password by invoking
    setPassword(password, cb) instance method to set a user's password
    hash and salt in the databease. */
    this.setPassword(
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
                cb && cb();
            });
        }
    );
};
Account.statics.resetPassword = function(token,  password, cb) {
    this.getByToken(token).then(function(user) {
        if (!user) {
            return false;
        }
        user.updatePassword(password, cb);
        user.resetToken();
    });
};
module.exports = mongoose.model('Account', Account);