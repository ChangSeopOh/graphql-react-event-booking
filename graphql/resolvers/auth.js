const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {  
    createUser: async (args) => {
        try {
            const findUser = await User.findOne({email: args.userInput.email});

            if (findUser) { //already exist user
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({email: args.userInput.email, password: hashedPassword});

            const result = await user.save();
            return {
                ...result._doc,
                password: null,
                _id: result.id
            };

        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password})=>{
        try{
            const user = await User.findOne({email:email});

            if(!user){
                throw new Error('User does not exist!');
            }

            //decrypt
            const isEqual = await bcrypt.compare(password, user.password);

            if(!isEqual){
                throw new Error('Password is incorrect!');
            }
            
            //to generate token for signing in
            const token = jwt.sign({userId:user.id, email:user.email}, 'ThisIsSecrectKey',{
                expiresIn: '1h'
            });                                                    //1hour that i worte above
            return {userId:user.id, token:token, tokenExpiration: 1};
            
        }catch(err){
            throw err;
        }
    }
}