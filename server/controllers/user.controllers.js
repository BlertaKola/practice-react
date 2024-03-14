const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


module.exports.register = (req, res) => {
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, "first key value");
 
        res.cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));

}

module.exports.login= async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    console.log(`hello: ${process.env.FIRST_SECRET_KEY}`); 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    // {id: 21312312312312} from askldjaoisjdpasjdopajas
    const userToken = jwt.sign({
        id: user._id
    }, "first key value");
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user});
}


module.exports.logout= (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(resi => res.json(resi))
        .catch(err => res.json(err))
}

module.exports.getUserById = (request, response) => {
    User.find({_id: request.params.id})
        .then(res => response.json(res))
        .catch(err => response.json(err))
}